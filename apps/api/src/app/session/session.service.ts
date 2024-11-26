import { User } from '@nbun/database'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from '~/database/prisma.service'
import { redisClient } from '~/database/redis'
import { exclude } from '~/database/utils'
import { env } from '~/env'
import { JwtAuthPayload } from '~/types/auth.types'

@Injectable()
export class SessionService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  getCacheKey(id: string) {
    return `session:${id}`
  }

  async create(user: Omit<User, 'password'>) {
    const newSession = await this.prisma.session.create({
      data: {
        user: {
          connect: {
            id: user.id
          }
        }
      }
    })

    const payload = { userId: user.id, sessionId: newSession.id }

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: env.SESSION_KEY,
      expiresIn: env.ACCESS_TOKEN_EXPIRES_IN
    })
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: env.SESSION_KEY,
      expiresIn: env.REFRESH_TOKEN_EXPIRES_IN
    })

    const data = await this.prisma.session.update({
      where: {
        id: newSession.id
      },
      data: {
        refreshToken,
        accessToken
      }
    })

    const session = { ...data, user }

    await redisClient.set(
      this.getCacheKey(session.id),
      JSON.stringify(session),
      {
        EX: 3600
      }
    )

    return session
  }

  async expire(id: string) {
    await redisClient.del(this.getCacheKey(id))

    await this.prisma.session.delete({
      where: { id }
    })
  }

  async refresh(payload: JwtAuthPayload) {
    const accessToken = await this.jwtService.signAsync(
      { sessionId: payload.sessionId, userId: payload.userId },
      {
        secret: env.SESSION_KEY,
        expiresIn: env.ACCESS_TOKEN_EXPIRES_IN
      }
    )

    const data = await this.prisma.session.update({
      where: { id: payload.sessionId },
      data: { accessToken },
      include: { user: true }
    })

    if (data) {
      const user = exclude(data.user, ['password'])

      const session = { ...data, user }
      await redisClient.set(
        this.getCacheKey(data.id),
        JSON.stringify(session),
        {
          EX: 3600
        }
      )

      return session
    }
  }

  async deleteAllByUserId(userId: string) {
    const sessions = await this.prisma.session.findMany({
      where: { userId },
      select: {
        id: true
      }
    })

    const cacheKeys = sessions.map(session => this.getCacheKey(session.id))
    await redisClient.del(cacheKeys)

    return this.prisma.session.deleteMany({ where: { userId } })
  }

  async findById(id: string) {
    const cachedSession = await redisClient.get(this.getCacheKey(id))
    if (cachedSession) return JSON.parse(cachedSession)

    const data = await this.prisma.session.findUnique({
      where: { id },
      include: { user: true }
    })

    if (data) {
      const user = exclude(data.user, ['password'])
      const session = { ...data, user }

      await redisClient.set(
        this.getCacheKey(data.id),
        JSON.stringify(session),
        {
          EX: 3600
        }
      )

      return session
    }
  }
}

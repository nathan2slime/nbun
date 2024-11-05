import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from '~/database/prisma.service'
import { JwtAuthPayload } from '~/types/auth.types'
import { exclude } from '~/database/utils'
import { env } from '~/env'

@Injectable()
export class SessionService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async create(userId: string) {
    await this.deleteAllByUserId(userId)

    const session = await this.prisma.session.create({
      data: {
        user: {
          connect: {
            id: userId
          }
        }
      }
    })

    const payload = { userId, sessionId: session.id }

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
        id: session.id
      },
      data: {
        refreshToken,
        accessToken
      },
      include: {
        user: true
      }
    })

    const user = exclude(data.user, ['password'])

    return { ...data, user }
  }

  async expire(id: string) {
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

    const session = await this.prisma.session.update({
      where: { id: payload.sessionId },
      data: { accessToken },
      include: { user: true }
    })

    if (session) {
      const user = exclude(session.user, ['password'])

      return { ...session, user }
    }
  }

  async deleteAllByUserId(userId: string) {
    return this.prisma.session.deleteMany({ where: { userId } })
  }

  async findById(id: string) {
    const session = await this.prisma.session.findUnique({
      where: { id },
      include: { user: true }
    })

    if (session) {
      const user = exclude(session.user, ['password'])

      return { ...session, user }
    }
  }
}

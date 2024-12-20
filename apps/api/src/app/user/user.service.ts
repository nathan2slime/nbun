import { Prisma, User } from '@nbun/database'
import { Injectable } from '@nestjs/common'

import { SignUpDto } from '~/app/auth/auth.dto'
import { UpdateUserDto } from '~/app/user/user.dto'
import { PrismaService } from '~/database/prisma.service'
import { exclude } from '~/database/utils'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } })

    return exclude<User, 'password'>(user, ['password'])
  }

  async create(data: SignUpDto) {
    const user = await this.prisma.user.create({ data })

    return exclude<User, 'password'>(user, ['password'])
  }

  async getByUsername(username: string) {
    return this.prisma.user.findFirst({ where: { username } })
  }

  async getOnlyPassword(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where,
      select: {
        password: true
      }
    })
  }

  async getExperience(id: string) {
    return this.prisma.user.findFirst({
      where: {
        id
      },
      select: {
        experience: true
      }
    })
  }

  async getRanking() {
    return this.prisma.user.findMany({
      where: {
        experience: {
          gt: 1
        }
      },
      select: {
        experience: true,
        id: true
      }
    })
  }

  async updateById(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data
    })
  }
}

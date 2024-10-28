import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'

import { SignUpDto } from '~/app/auth/auth.dto'
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
    return this.prisma.user.findUnique({ where: { username } })
  }

  async getOnlyPassword(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where,
      select: {
        password: true
      }
    })
  }
}

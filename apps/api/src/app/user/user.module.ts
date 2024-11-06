import { Module } from '@nestjs/common'

import { UserController } from '~/app/user/user.controller'
import { UserService } from '~/app/user/user.service'
import { PrismaService } from '~/database/prisma.service'

@Module({
  providers: [UserService, PrismaService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}

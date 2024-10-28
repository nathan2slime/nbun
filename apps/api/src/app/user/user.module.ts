import { Module } from '@nestjs/common'

import { UserService } from '~/app/user/user.service'
import { PrismaService } from '~/database/prisma.service'

@Module({
  providers: [UserService, PrismaService],
  exports: [UserService]
})
export class UserModule {}

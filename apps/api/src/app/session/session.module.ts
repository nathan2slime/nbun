import { Module } from '@nestjs/common'

import { SessionService } from '~/app/session/session.service'
import { PrismaService } from '~/database/prisma.service'

@Module({
  providers: [SessionService, PrismaService],
  exports: [SessionService]
})
export class SessionModule {}

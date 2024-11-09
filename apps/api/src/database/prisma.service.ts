import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

import { logger } from '~/logger'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({ log: ['error', 'info', 'query', 'warn'] })
  }

  async onModuleInit() {
    try {
      await this.$connect()
    } catch (e: unknown) {
      logger.error(e)
    }
  }
}

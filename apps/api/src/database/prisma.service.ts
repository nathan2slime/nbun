import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient, Prisma } from '@prisma/client'

import { logger } from '~/logger'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({ log: ['error', 'info', 'query', 'warn'] })
  }

  async onModuleInit() {
    try {
      this.$extends({
        name: 'softDelete',
        query: {
          $allModels: {
            $allOperations({ query, ...params }) {
              const args = (params.args || {}) as Prisma.QuizFindUniqueArgs

              if (args.where) args.where.deletedAt = null

              return query(args)
            }
          }
        }
      })

      await this.$connect()
    } catch (e: unknown) {
      logger.error(e)
    }
  }
}

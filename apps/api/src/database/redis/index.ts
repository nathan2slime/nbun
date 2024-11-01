import { createClient, RedisClientType } from 'redis'

import { env } from '~/env'
import { logger } from '~/logger'

export const redisClient: RedisClientType = createClient({
  url: env.DATABASE_REDIS_URL
})

redisClient.on('error', err => logger.error(err))

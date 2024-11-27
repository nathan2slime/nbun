import { config } from 'dotenv'
import { parseEnv } from 'znv'
import { z } from 'zod'

config({
  path: ['.env.local', '.env', '.env.development.local']
})

export const { NODE_ENV } = parseEnv(process.env, {
  NODE_ENV: z
    .enum(['production', 'test', 'development'] as const)
    .default('development')
})

const envSchema = {
  DATABASE_URL: z.string().url(),
  SESSION_KEY: z.string().min(4),
  PORT: z.string().min(1).default('5400'),
  ACCESS_TOKEN_EXPIRES_IN: z.string().default('1h'),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('1d'),
  DATABASE_REDIS_URL: z.string().url(),
  APP_URL: z.string().url(),
  AUTH_COOKIE: z.string().default('auth')
}

export const env =
  NODE_ENV === 'test' ? process.env : parseEnv(process.env, envSchema)

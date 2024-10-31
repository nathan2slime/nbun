import { User } from '@prisma/client'

export type JwtAuthPayload = {
  exp: number
  userId: string
  sessionId: string
}

export type Request = Express.Request & {
  user: User
}

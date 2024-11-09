import { Session } from '@prisma/client'

import { JwtAuthPayload } from '~/types/auth.types'

export type Request = Express.Request & {
  user: Session
  handshake: {
    headers: Record<string, string>
  }
  cookies: Record<string, { refreshToken: string; sessionToken: string }>
}

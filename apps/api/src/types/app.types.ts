import { Session } from '@nbun/database'

export type Request = Express.Request & {
  user: Session
  handshake: {
    headers: Record<string, string>
  }
  cookies: Record<string, { refreshToken: string; sessionToken: string }>
}

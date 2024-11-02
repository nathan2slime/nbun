import { Session } from '@prisma/client'

export type Request = Express.Request & {
  user: Session
}

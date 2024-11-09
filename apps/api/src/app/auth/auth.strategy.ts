import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { parse } from 'cookie'

import { JwtAuthPayload } from '~/types/auth.types'
import { SessionService } from '~/app/session/session.service'
import { env } from '~/env'
import { Request } from '~/types/app.types'
import { logger } from '~/logger'

const getWsCookies = (req: Request) => {
  try {
    const handshake = req.handshake

    if (handshake) {
      const cookies = parse(handshake.headers.cookie, {})
      if (cookies[env.AUTH_COOKIE]) {
        const auth = JSON.parse(cookies.auth.slice(2))

        return { [env.AUTH_COOKIE]: auth }
      }
    }
  } catch (error) {
    logger.error(error)
    return
  }
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly sessionService: SessionService) {
    super({
      ignoreExpiration: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const cookies = req.cookies || getWsCookies(req)

          if (cookies) {
            const data = cookies[env.AUTH_COOKIE]

            if (data && data.accessToken) return data.accessToken
          }

          return null
        }
      ]),
      secretOrKey: env.SESSION_KEY
    })
  }

  async validate(payload: JwtAuthPayload) {
    const session = await this.sessionService.findById(payload.sessionId)

    if (session) return session

    throw new UnauthorizedException()
  }
}

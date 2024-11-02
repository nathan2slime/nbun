import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'

import { JwtAuthPayload } from '~/types/auth.types'
import { SessionService } from '~/app/session/session.service'
import { env } from '~/env'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly sessionService: SessionService) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const cookies = req.cookies

          if (req && cookies) {
            const data = cookies[env.AUTH_COOKIE]

            if (data && data.refreshToken) return data.refreshToken
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

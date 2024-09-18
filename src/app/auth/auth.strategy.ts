import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthPayload } from '~/types/auth.types';
import { env } from '~/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req && req.headers['authorization'],
      ]),
      secretOrKey: env.SESSION_KEY,
    });
  }

  async validate(payload: JwtAuthPayload) {
    return payload;
  }
}

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthPayload } from '~/types/auth.types';
import { env } from '~/env';
import { UserService } from '~/app/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req && req.headers['authorization'],
      ]),
      secretOrKey: env.SESSION_KEY,
    });
  }

  async validate(payload: JwtAuthPayload) {
    const user = await this.userService.getById(payload.userId);

    if (user) return user;

    throw new UnauthorizedException();
  }
}

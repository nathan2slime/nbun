import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '~/app/auth/auth.controller';
import { AuthService } from '~/app/auth/auth.service';
import { env } from '~/env';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.SESSION_KEY,
      signOptions: { expiresIn: '30d' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

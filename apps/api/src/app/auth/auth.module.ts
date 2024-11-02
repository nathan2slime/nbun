import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthController } from '~/app/auth/auth.controller'
import { AuthService } from '~/app/auth/auth.service'
import { JwtStrategy } from '~/app/auth/auth.strategy'
import { JwtRefreshStrategy } from '~/app/auth/refresh.strategy'
import { SessionModule } from '~/app/session/session.module'
import { UserModule } from '~/app/user/user.module'
import { env } from '~/env'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.SESSION_KEY,
      signOptions: { expiresIn: '30d' }
    }),
    PassportModule,
    UserModule,
    SessionModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
  exports: [AuthService]
})
export class AuthModule {}

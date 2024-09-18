import { Module } from '@nestjs/common';

import { AuthModule } from '~/app/auth/auth.module';

@Module({
  imports: [],
  controllers: [],
  providers: [AuthModule],
})
export class AppModule {}

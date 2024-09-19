import { Module } from '@nestjs/common';

import { AuthModule } from '~/app/auth/auth.module';
import { QuestionModule } from '~/app/question/question.module';
import { QuizModule } from '~/app/quiz/quiz.module';
import { UserModule } from '~/app/user/user.module';

@Module({
  imports: [AuthModule, QuestionModule, UserModule, QuizModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

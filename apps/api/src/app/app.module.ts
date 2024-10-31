import { Module } from '@nestjs/common'

import { AuthModule } from '~/app/auth/auth.module'
import { QuestionModule } from '~/app/question/question.module'
import { QuizModule } from '~/app/quiz/quiz.module'
import { SessionModule } from '~/app/session/session.module'
import { UserModule } from '~/app/user/user.module'

@Module({
  imports: [AuthModule, QuizModule, QuestionModule, UserModule, SessionModule],
  controllers: [],
  providers: []
})
export class AppModule {}

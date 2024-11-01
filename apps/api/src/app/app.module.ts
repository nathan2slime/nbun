import { Module } from '@nestjs/common'

import { AuthModule } from '~/app/auth/auth.module'
import { QuestionOptionModule } from '~/app/question-option/question-option.module'
import { QuestionModule } from '~/app/question/question.module'
import { QuizModule } from '~/app/quiz/quiz.module'
import { SessionModule } from '~/app/session/session.module'
import { UserModule } from '~/app/user/user.module'

@Module({
  imports: [
    AuthModule,
    QuizModule,
    QuestionModule,
    QuestionOptionModule,
    UserModule,
    SessionModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

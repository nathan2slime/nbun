import { Module } from '@nestjs/common'

import { QuestionResponseModule } from '~/app/question-response/question-response.module'
import { QuestionModule } from '~/app/question/question.module'
import { QuizMemberModule } from '~/app/quiz-member/quiz-member.module'
import { QuizResponseModule } from '~/app/quiz-response/quiz-response.module'
import { QuizScoreModule } from '~/app/quiz-score/quiz-score.module'
import { QuizController } from '~/app/quiz/quiz.controller'
import { QuizGateway } from '~/app/quiz/quiz.gateway'
import { QuizService } from '~/app/quiz/quiz.service'
import { UserModule } from '~/app/user/user.module'
import { WebSocketSessionModule } from '~/app/websocket-session/websocket-session.module'
import { PrismaService } from '~/database/prisma.service'

@Module({
  imports: [
    QuizMemberModule,
    QuestionModule,
    QuizResponseModule,
    UserModule,
    QuizScoreModule,
    QuestionResponseModule,
    WebSocketSessionModule
  ],
  controllers: [QuizController],
  providers: [QuizService, PrismaService, QuizGateway],
  exports: [QuizService]
})
export class QuizModule {}

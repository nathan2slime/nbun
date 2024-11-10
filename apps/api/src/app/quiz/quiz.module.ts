import { Module } from '@nestjs/common'

import { QuestionModule } from '~/app/question/question.module'
import { QuizMemberModule } from '~/app/quiz-member/quiz-member.module'
import { QuizController } from '~/app/quiz/quiz.controller'
import { QuizGateway } from '~/app/quiz/quiz.gateway'
import { QuizService } from '~/app/quiz/quiz.service'
import { WebSocketSessionModule } from '~/app/websocket-session/websocket-session.module'
import { PrismaService } from '~/database/prisma.service'

@Module({
  imports: [QuizMemberModule, QuestionModule, WebSocketSessionModule],
  controllers: [QuizController],
  providers: [QuizService, PrismaService, QuizGateway]
})
export class QuizModule {}

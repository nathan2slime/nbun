import { Module } from '@nestjs/common'

import { QuizMemberModule } from '~/app/quiz-member/quiz-member.module'
import { QuizController } from '~/app/quiz/quiz.controller'
import { QuizGateway } from '~/app/quiz/quiz.gateway'
import { QuizService } from '~/app/quiz/quiz.service'
import { PrismaService } from '~/database/prisma.service'

@Module({
  imports: [QuizMemberModule],
  controllers: [QuizController],
  providers: [QuizService, PrismaService, QuizGateway]
})
export class QuizModule {}

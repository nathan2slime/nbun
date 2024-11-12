import { Module } from '@nestjs/common'

import { QuestionController } from '~/app/question/question.controller'
import { QuestionService } from '~/app/question/question.service'
import { QuizService } from '~/app/quiz/quiz.service'
import { PrismaService } from '~/database/prisma.service'

@Module({
  imports: [],
  controllers: [QuestionController],
  exports: [QuestionService],
  providers: [QuestionService, QuizService, PrismaService]
})
export class QuestionModule {}

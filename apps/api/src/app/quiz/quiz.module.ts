import { Module } from '@nestjs/common'

import { QuizController } from '~/app/quiz/quiz.controller'
import { QuizService } from '~/app/quiz/quiz.service'
import { PrismaService } from '~/database/prisma.service'

@Module({
  controllers: [QuizController],
  providers: [QuizService, PrismaService]
})
export class QuizModule {}

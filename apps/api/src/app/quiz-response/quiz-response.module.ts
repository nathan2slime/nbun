import { Module } from '@nestjs/common'

import { QuizResponseController } from '~/app/quiz-response/quiz-response.controller'
import { QuizResponseService } from '~/app/quiz-response/quiz-response.service'
import { PrismaService } from '~/database/prisma.service'

@Module({
  controllers: [QuizResponseController],
  providers: [PrismaService, QuizResponseService],
  exports: [QuizResponseService]
})
export class QuizResponseModule {}

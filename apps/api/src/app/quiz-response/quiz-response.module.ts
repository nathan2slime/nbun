import { Module } from '@nestjs/common'

import { QuizResponseService } from '~/app/quiz-response/quiz-response.service'
import { PrismaService } from '~/database/prisma.service'

@Module({
  providers: [PrismaService, QuizResponseService],
  exports: [QuizResponseService]
})
export class QuizResponseModule {}

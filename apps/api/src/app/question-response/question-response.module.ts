import { Module } from '@nestjs/common'

import { QuestionResponseService } from '~/app/question-response/question-response.service'
import { QuizResponseModule } from '~/app/quiz-response/quiz-response.module'
import { PrismaService } from '~/database/prisma.service'

@Module({
  imports: [QuizResponseModule],
  providers: [PrismaService, QuestionResponseService],
  exports: [QuestionResponseService]
})
export class QuestionResponseModule {}

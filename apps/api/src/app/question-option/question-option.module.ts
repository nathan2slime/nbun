import { Module } from '@nestjs/common'

import { QuestionOptionController } from '~/app/question-option/question-option.controller'
import { QuestionOptionService } from '~/app/question-option/question-option.service'
import { QuestionModule } from '~/app/question/question.module'
import { QuizModule } from '~/app/quiz/quiz.module'
import { PrismaService } from '~/database/prisma.service'

@Module({
  imports: [QuestionModule, QuizModule],
  controllers: [QuestionOptionController],
  providers: [PrismaService, QuestionOptionService],
  exports: [QuestionOptionService]
})
export class QuestionOptionModule {}

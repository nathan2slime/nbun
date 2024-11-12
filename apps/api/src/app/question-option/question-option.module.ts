import { Module } from '@nestjs/common'

import { QuestionOptionController } from '~/app/question-option/question-option.controller'
import { QuestionOptionService } from '~/app/question-option/question-option.service'
import { QuestionModule } from '~/app/question/question.module'
import { PrismaService } from '~/database/prisma.service'

@Module({
  imports: [QuestionModule],
  controllers: [QuestionOptionController],
  providers: [PrismaService, QuestionOptionService],
  exports: [QuestionOptionService]
})
export class QuestionOptionModule {}

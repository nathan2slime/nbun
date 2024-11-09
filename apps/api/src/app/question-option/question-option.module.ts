import { Module } from '@nestjs/common'

import { QuestionOptionController } from '~/app/question-option/question-option.controller'
import { QuestionOptionService } from '~/app/question-option/question-option.service'
import { PrismaService } from '~/database/prisma.service'

@Module({
  controllers: [QuestionOptionController],
  providers: [PrismaService, QuestionOptionService],
  exports: [QuestionOptionService]
})
export class QuestionOptionModule {}

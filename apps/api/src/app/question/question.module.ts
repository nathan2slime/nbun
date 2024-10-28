import { Module } from '@nestjs/common'

import { QuestionService } from '~/app/question/question.service'
import { PrismaService } from '~/database/prisma.service'

@Module({
  providers: [QuestionService, PrismaService]
})
export class QuestionModule {}

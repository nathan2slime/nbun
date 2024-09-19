import { Module } from '@nestjs/common';

import { QuestionService } from '~/app/question/question.service';
import { PrismaService } from '~/database';

@Module({
  providers: [QuestionService, PrismaService],
  controllers: [],
  exports: [QuestionService],
})
export class QuestionModule {}

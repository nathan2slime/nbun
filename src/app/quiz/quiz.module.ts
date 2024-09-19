import { Module } from '@nestjs/common';

import { QuestionModule } from '~/app/question/question.module';
import { QuizController } from '~/app/quiz/quiz.controller';
import { QuizService } from '~/app/quiz/quiz.service';
import { PrismaService } from '~/database';

@Module({
  providers: [QuizService, PrismaService],
  controllers: [QuizController],
  imports: [QuestionModule],
})
export class QuizModule {}

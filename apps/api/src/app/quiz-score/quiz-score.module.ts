import { Module } from '@nestjs/common'

import { QuizScoreService } from '~/app/quiz-score/quiz-score.service'

@Module({
  providers: [QuizScoreService],
  exports: [QuizScoreService]
})
export class QuizScoreModule {}

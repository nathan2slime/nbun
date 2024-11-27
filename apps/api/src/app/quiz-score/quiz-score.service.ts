import { Injectable } from '@nestjs/common'

import {
  GetUserScore,
  UpdateQuizRanking
} from '~/app/quiz-score/quiz-score.type'
import { redisClient } from '~/database/redis'

@Injectable()
export class QuizScoreService {
  getKey(quizId: string) {
    return `ranking:${quizId}`
  }

  async updateScore({ quizId, userId, newScore }: UpdateQuizRanking) {
    return redisClient.zIncrBy(this.getKey(quizId), newScore, userId)
  }

  async getScore({ quizId, userId }: GetUserScore) {
    return redisClient.zRank(this.getKey(quizId), userId)
  }

  async getRanking(quizId: string) {
    const res = await redisClient.zRangeWithScores(this.getKey(quizId), 0, -1)

    return res.map(({ value, score }, index) => ({
      rank: index + 1,
      playerId: value,
      score
    }))
  }
}

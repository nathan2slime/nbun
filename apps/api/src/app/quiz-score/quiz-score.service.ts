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

  async delete(quizId: string) {
    const key = this.getKey(quizId)
    const members = await redisClient.zRange(key, 0, -1)

    if (members.length > 0) {
      for (const member of members) {
        await redisClient.zRevRank(key, member)
      }
    }
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

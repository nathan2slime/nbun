import { Injectable } from '@nestjs/common'

import { JoinMemberDto, QuizIdDto } from '~/app/quiz/quiz.dto'
import { redisClient } from '~/database/redis'

@Injectable()
export class QuizMemberService {
  async add(data: JoinMemberDto) {
    const key = this.getKey(data.quizId)

    await redisClient.sAdd(key, data.memberId)
  }

  async hasIn(data: JoinMemberDto) {
    if (data.quizId) {
      const key = this.getKey(data.quizId)

      return redisClient.sIsMember(key, data.memberId)
    }
  }

  async remove(data: JoinMemberDto) {
    const key = this.getKey(data.quizId)

    if (data.quizId) {
      await redisClient.sRem(key, data.memberId)
    }
  }

  async get(data: QuizIdDto) {
    const key = this.getKey(data.quizId)

    return redisClient.sMembers(key)
  }

  getKey(quizId: string) {
    return `quiz:${quizId}:members`
  }
}

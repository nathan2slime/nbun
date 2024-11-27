import { Injectable } from '@nestjs/common'

import { WebSocketSessionDto } from '~/app/websocket-session/websocket-session.dto'
import { redisClient } from '~/database/redis'

@Injectable()
export class WebSocketSessionService {
  async connect(data: WebSocketSessionDto) {
    const key = this.getKey(data.clientId)

    await redisClient.hSet(key, {
      memberId: data.memberId,
      quizId: data.quizId
    })
  }

  async getConnection(clientId: string) {
    const key = this.getKey(clientId)

    const memberId = await redisClient.hGet(key, 'memberId')
    const quizId = await redisClient.hGet(key, 'quizId')
    return { memberId, quizId, clientId } as WebSocketSessionDto
  }

  async disconnect(data: WebSocketSessionDto) {
    const key = this.getKey(data.clientId)

    await redisClient.hDel(key, ['memberId', 'quizId'])
  }

  getKey(clientId: string) {
    return `connections:${clientId}`
  }
}

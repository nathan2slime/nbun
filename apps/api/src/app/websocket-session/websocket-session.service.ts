import { Injectable } from '@nestjs/common'

import { WebSocketSessionDto } from '~/app/websocket-session/websocket-session.dto'
import { redisClient } from '~/database/redis'

@Injectable()
export class WebSocketSessionService {
  async connect(data: WebSocketSessionDto) {
    const key = this.getKey(data.clientId)

    await redisClient.set(key, data.memberId)
  }

  async getConnection(clientId: string) {
    const key = this.getKey(clientId)

    const memberId = await redisClient.get(key)

    return { memberId, clientId }
  }

  async disconnect(data: WebSocketSessionDto) {
    const key = this.getKey(data.clientId)

    await redisClient.del(key)
  }

  getKey(clientId: string) {
    return `connection:${clientId}`
  }
}

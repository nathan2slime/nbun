import { Injectable } from '@nestjs/common'

import {
  GetWebSocketSessionDto,
  WebSocketSessionDto
} from '~/app/member-connection/websocket-session.dto'
import { redisClient } from '~/database/redis'

@Injectable()
export class WebSocketSessionService {
  async connect(data: WebSocketSessionDto) {
    const key = this.getKey(data.clientId)

    await redisClient.set(key, data.memberId)
  }

  async getConnection(clientId: string) {
    const key = this.getKey(clientId)

    const data = (await redisClient.json.get(key)) as Omit<
      WebSocketSessionDto,
      'clientId'
    >

    return { ...data, clientId }
  }

  async disconnect(data: WebSocketSessionDto) {
    const key = this.getKey(data.clientId)

    await redisClient.json.del(key)
  }

  getKey(clientId: string) {
    return `connection:${clientId}`
  }
}

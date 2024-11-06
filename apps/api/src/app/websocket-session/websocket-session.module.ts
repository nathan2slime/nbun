import { Module } from '@nestjs/common'
import { WebSocketSessionService } from '~/app/websocket-session/websocket-session.service'

@Module({
  exports: [WebSocketSessionService],
  providers: [WebSocketSessionService]
})
export class WebSocketSessionModule {}

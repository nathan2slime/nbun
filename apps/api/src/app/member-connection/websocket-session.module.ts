import { Module } from '@nestjs/common'
import { WebSocketSessionService } from '~/app/member-connection/websocket-session.service'

@Module({
  exports: [WebSocketSessionService],
  providers: [WebSocketSessionService]
})
export class WebSocketSessionModule {}

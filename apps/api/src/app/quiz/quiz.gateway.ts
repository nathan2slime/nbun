import { UsePipes, ValidationPipe } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from '@nestjs/websockets'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Server, Socket } from 'socket.io'

import { QuizMemberService } from '~/app/quiz-member/quiz-member.service'
import { GetQuizMembersDto, JoinMemberDto } from '~/app/quiz/quiz.dto'
import { WebSocketSessionService } from '~/app/member-connection/websocket-session.service'
import { GetWebSocketSessionDto } from '~/app/member-connection/websocket-session.dto'

import { NODE_ENV, env } from '~/env'

@WebSocketGateway({
  cors: {
    origin: NODE_ENV == 'development' ? '*' : env.APP_URL
  }
})
@UsePipes(ValidationPipe)
export class QuizGateway implements OnGatewayDisconnect {
  constructor(
    private readonly quizMemberService: QuizMemberService,
    private readonly webSocketSessionService: WebSocketSessionService
  ) {}

  @WebSocketServer()
  server: Server

  async handleDisconnect(client: Socket) {
    const clientId = client.id

    const connection =
      await this.webSocketSessionService.getConnection(clientId)

    if (connection) {
      await this.webSocketSessionService.disconnect(connection)
    }
  }

  @SubscribeMessage('connect')
  async connect(
    @MessageBody() data: GetWebSocketSessionDto,
    @ConnectedSocket() client: Socket
  ) {
    await this.webSocketSessionService.connect({
      ...data,
      clientId: client.id
    })
  }

  @SubscribeMessage('members')
  async getMembers(
    @MessageBody() data: GetQuizMembersDto
  ): Promise<Observable<WsResponse<string>>> {
    const members = await this.quizMemberService.get(data)

    return from(members).pipe(map(value => ({ event: 'members', data: value })))
  }

  @SubscribeMessage('join')
  async join(@MessageBody() data: JoinMemberDto) {
    const isNew = await this.quizMemberService.hasIn(data)

    if (!isNew) {
      await this.quizMemberService.add(data)

      this.server.emit('join:' + data.quizId, data.memberId)
    }
  }
}

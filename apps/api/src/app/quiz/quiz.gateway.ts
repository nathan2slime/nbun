import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from '@nestjs/websockets'
import { Observable, from } from 'rxjs'
import { map } from 'rxjs/operators'
import { Server, Socket } from 'socket.io'

import { JwtAuthGuard } from '~/app/auth/auth.guard'
import { QuestionService } from '~/app/question/question.service'
import { QuizMemberService } from '~/app/quiz-member/quiz-member.service'
import { JoinMemberDto, QuizIdDto } from '~/app/quiz/quiz.dto'
import { QuizService } from '~/app/quiz/quiz.service'
import { PayloadQuestionTime } from '~/app/quiz/quiz.type'
import { GetWebSocketSessionDto } from '~/app/websocket-session/websocket-session.dto'
import { WebSocketSessionService } from '~/app/websocket-session/websocket-session.service'

import { env } from '~/env'

@WebSocketGateway({
  cors: {
    origin: env.APP_URL,
    credentials: true
  }
})
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
export class QuizGateway implements OnGatewayDisconnect {
  constructor(
    private readonly quizMemberService: QuizMemberService,
    private readonly quizService: QuizService,
    private readonly questionService: QuestionService,
    private readonly webSocketSessionService: WebSocketSessionService
  ) {}

  private times: Map<string, PayloadQuestionTime> = new Map()

  @WebSocketServer()
  server: Server

  async handleDisconnect(client: Socket) {
    const clientId = client.id

    const connection =
      await this.webSocketSessionService.getConnection(clientId)

    if (connection) {
      await this.webSocketSessionService.disconnect(connection)
      await this.quizMemberService.remove(connection)
      this.server.emit(`leave:${connection.quizId}`, connection)
    }
  }

  @SubscribeMessage('onquiz')
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
    @MessageBody() data: QuizIdDto
  ): Promise<Observable<WsResponse<string>>> {
    const members = await this.quizMemberService.get(data)

    return from(members).pipe(map(value => ({ event: 'members', data: value })))
  }

  @SubscribeMessage('join')
  async join(@MessageBody() data: JoinMemberDto) {
    const isNew = await this.quizMemberService.hasIn(data)

    if (!isNew) {
      await this.quizMemberService.add(data)

      this.server.emit(`join:${data.quizId}`, data.memberId)
    }
  }

  @SubscribeMessage('start')
  async start(@MessageBody() data: QuizIdDto) {
    if (this.times.has(data.quizId)) return

    await this.quizService.start(data.quizId)
    const gameRules = await this.questionService.getGameRule(data.quizId)

    this.server.emit(`start:${data.quizId}`)

    for (const gameRule of gameRules) {
      const index = gameRules.indexOf(gameRule)

      const { id: questionId } = gameRule

      const payload: PayloadQuestionTime = {
        time: gameRule.time,
        questionId,
        at: new Date()
      }

      await new Promise<boolean>(resolve => {
        this.times.set(data.quizId, payload)

        this.server.emit(`start:question:${data.quizId}`, payload)

        setTimeout(() => {
          this.server.emit(`finish:question:${data.quizId}`, payload)

          resolve(true)
        }, gameRule.time * 1000)
      })

      if (index === gameRules.length - 1) {
        this.times.delete(data.quizId)
        this.server.emit(`close:${data.quizId}`)
      }
    }
  }
}

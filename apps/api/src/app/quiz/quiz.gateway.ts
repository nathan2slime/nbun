import { Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
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
import { Observable, from } from 'rxjs'
import { map } from 'rxjs/operators'
import { Server, Socket } from 'socket.io'
import { JwtAuthGuard } from '~/app/auth/auth.guard'

import { QuestionResponseService } from '~/app/question-response/question-response.service'
import { QuestionService } from '~/app/question/question.service'
import { QuizMemberService } from '~/app/quiz-member/quiz-member.service'
import { QuizScoreService } from '~/app/quiz-score/quiz-score.service'
import {
  JoinMemberDto,
  QuizIdDto,
  SocketQuestionResponse
} from '~/app/quiz/quiz.dto'
import { QuizService } from '~/app/quiz/quiz.service'
import { GetWebSocketSessionDto } from '~/app/websocket-session/websocket-session.dto'
import { WebSocketSessionService } from '~/app/websocket-session/websocket-session.service'

import { env } from '~/env'
import { logger } from '~/logger'
import { Request } from '~/types/app.types'

@WebSocketGateway({
  cors: {
    origin: env.APP_URL,
    credentials: true
  }
})
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
export class QuizGateway implements OnGatewayDisconnect, OnGatewayConnection {
  constructor(
    private readonly quizMemberService: QuizMemberService,
    private readonly quizService: QuizService,
    private readonly questionService: QuestionService,
    private readonly quizScoreService: QuizScoreService,
    private readonly webSocketSessionService: WebSocketSessionService,
    private readonly questionResponseService: QuestionResponseService
  ) {}

  private times: Map<string, true> = new Map()

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

  handleConnection(client: Socket) {
    logger.info(`new client connected ${client.id}`)
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

  @SubscribeMessage('response')
  async answer(
    @MessageBody() args: SocketQuestionResponse,
    @Req() req: Request
  ) {
    const session = req.user
    const { difficulty, isCorrect, ...data } = args

    const userId = session.userId

    if (isCorrect) {
      const newScore = this.questionService.scoringRule[difficulty]

      const score = await this.quizScoreService.updateScore({
        quizId: data.quizId,
        userId,
        newScore
      })

      this.server.emit(`quiz:answer:${data.quizId}`, { score, userId })
    }

    await this.questionResponseService.create(data, userId)
  }

  @SubscribeMessage('start')
  async start(@MessageBody() data: QuizIdDto) {
    if (this.times.has(data.quizId)) return

    await this.quizService.start(data.quizId)
    const gameRules = await this.questionService.getGameRule(data.quizId)

    const time = gameRules.reduce((acc, e) => acc + e.time, 0)
    this.server.emit(`start:${data.quizId}`, { rules: gameRules, time })

    await new Promise(resolve => {
      this.times.set(data.quizId, true)

      setTimeout(() => {
        resolve(true)
      }, time * 1000)
    })

    this.server.emit(`close:${data.quizId}`)

    this.times.delete(data.quizId)
  }
}

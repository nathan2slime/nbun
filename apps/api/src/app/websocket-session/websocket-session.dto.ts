import { IsString } from 'class-validator'

export class WebSocketSessionDto {
  @IsString()
  clientId: string

  @IsString()
  memberId: string

  @IsString()
  quizId: string
}

export class GetWebSocketSessionDto {
  @IsString()
  memberId: string

  @IsString()
  quizId: string
}

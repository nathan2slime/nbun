import { IsString } from 'class-validator'

export class WebSocketSessionDto {
  @IsString()
  clientId: string

  @IsString()
  memberId: string
}

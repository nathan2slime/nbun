import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID } from 'class-validator'

export class CreateQuestionDto {
  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty()
  @IsUUID()
  quizId: string
}

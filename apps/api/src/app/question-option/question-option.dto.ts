import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateQuestionOptionDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  questionId: string
}

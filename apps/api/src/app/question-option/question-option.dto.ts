import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateQuestionOptionDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  questionId: string
}

export class QueryQuestionOptionDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  questionId: string
}

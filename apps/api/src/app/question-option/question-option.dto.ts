import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateQuestionOptionDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  questionId: string
}

export class UpdateQuestionOptionDto {
  @IsOptional()
  @ApiProperty()
  title: string
}

export class QueryQuestionOptionDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  questionId: string
}

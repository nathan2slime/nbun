import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { QuestionHeader } from '~/app/question/question.dto'

export class CreateQuestionOptionDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string
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

export class QuestionOptionHeader extends QuestionHeader {
  @ApiProperty()
  @IsString()
  @IsUUID()
  ['question-option-id']: string
}

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

import { QuestionHeader } from '~/app/question/question.dto'

export class CreateQuestionOptionDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string

  @ApiProperty({ required: false })
  correct: boolean = false
}

export class UpdateQuestionOptionDto {
  @IsOptional()
  @ApiProperty({ required: false })
  title: string

  @IsOptional()
  @ApiProperty({ required: false })
  correct: boolean
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

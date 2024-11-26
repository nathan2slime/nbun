import { Difficulty } from '@nbun/database'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator'
import { QuizHeader } from '~/app/quiz/quiz.dto'

export class CreateQuestionDto {
  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty({ enum: Difficulty })
  @IsEnum(Difficulty)
  difficulty: Difficulty
}

export class UpdateQuestionDto {
  @IsOptional()
  @ApiProperty({ required: false, enum: Difficulty })
  difficulty: Difficulty

  @ApiProperty()
  @IsString()
  title: string
}

export class QueryQuestionDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  quizId: string
}

export class QuestionHeader extends QuizHeader {
  @ApiProperty()
  @IsString()
  @IsUUID()
  'question-id': string
}

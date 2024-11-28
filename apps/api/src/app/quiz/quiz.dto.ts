import { Difficulty } from '@nbun/database'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID
} from 'class-validator'

export class CreateQuizDto {
  @ApiProperty()
  @IsString()
  title: string
}

export class UpdateQuizDto {
  @IsOptional()
  @ApiProperty({ required: false })
  title: string
}

export class JoinMemberDto {
  @IsString()
  quizId: string

  @IsString()
  memberId: string
}

export class QuizIdDto {
  @IsString()
  quizId: string
}

export class SocketQuestionResponse {
  @IsString()
  quizId: string

  @IsString()
  questionId: string

  @IsString()
  questionOptionId: string

  @IsBoolean()
  isCorrect: boolean

  @IsEnum(Difficulty)
  difficulty: Difficulty
}

export class QuizHeader {
  @ApiProperty()
  @IsString()
  @IsUUID()
  'quiz-id': string
}

import { Difficulty } from '@nbun/database'
import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator'
import { CreateQuestionResponseDto } from '~/app/question-response/question-response.dto'

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

export class SocketQuestionResponse extends CreateQuestionResponseDto {
  @IsBoolean()
  isCorrect: boolean

  @IsOptional()
  @ApiProperty({ required: false, enum: Difficulty })
  difficulty: Difficulty
}

export class QuizHeader {
  @ApiProperty()
  @IsString()
  @IsUUID()
  'quiz-id': string
}

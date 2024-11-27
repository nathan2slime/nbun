import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateQuestionResponseDto {
  @IsNotEmpty()
  @IsUUID()
  quizId: string

  @IsNotEmpty()
  @IsUUID()
  questionId: string

  @IsNotEmpty()
  @IsUUID()
  questionOptionId: string
}

export class WhereQuestionResponseDto {
  @IsNotEmpty()
  @IsUUID()
  quizId: string

  @IsNotEmpty()
  @IsUUID()
  questionId: string

  @IsNotEmpty()
  @IsUUID()
  questionOptionId: string
}

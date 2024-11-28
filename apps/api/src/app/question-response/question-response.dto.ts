import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateQuestionResponseDto {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  quizId: string

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  questionId: string

  @IsNotEmpty()
  @IsString()
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

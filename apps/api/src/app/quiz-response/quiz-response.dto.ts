import { IsNotEmpty, IsUUID } from 'class-validator'

export class WhereQuizResponseDto {
  @IsNotEmpty()
  @IsUUID()
  quizId: string

  @IsNotEmpty()
  @IsUUID()
  userId: string
}

export class CreateQuizResponseDto {
  @IsNotEmpty()
  @IsUUID()
  quizId: string

  @IsNotEmpty()
  @IsUUID()
  userId: string
}

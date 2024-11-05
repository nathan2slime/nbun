import { ApiProperty } from '@nestjs/swagger'
import { Difficulty } from '@prisma/client'
import { IsOptional, IsString } from 'class-validator'

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

export class GetQuizMembersDto {
  @IsString()
  quizId: string
}

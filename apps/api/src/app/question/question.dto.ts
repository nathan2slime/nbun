import { ApiProperty } from '@nestjs/swagger'
import { Difficulty } from '@prisma/client'
import { IsEnum, IsUUID, IsString, IsOptional } from 'class-validator'

export class CreateQuestionDto {
  @ApiProperty()
  @IsString()
  title: string

  @IsUUID()
  @ApiProperty()
  @IsString()
  quizId: string

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

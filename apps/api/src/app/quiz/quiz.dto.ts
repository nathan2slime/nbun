import { ApiProperty } from '@nestjs/swagger'
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

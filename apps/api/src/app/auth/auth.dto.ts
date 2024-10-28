import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Min } from 'class-validator'

export class SignUpDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string

  @IsNotEmpty()
  @ApiProperty()
  avatar: string

  @IsNotEmpty()
  @ApiProperty()
  @Min(4)
  password: string
}

export class SignInDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string

  @ApiProperty()
  @IsNotEmpty()
  password: string
}

import { IsNotEmpty, Min } from 'class-validator'

export class UpdateUserDto {
  @IsNotEmpty()
  @Min(0)
  experience: number
}

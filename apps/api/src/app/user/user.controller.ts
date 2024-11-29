import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '~/app/auth/auth.guard'
import { UserService } from '~/app/user/user.service'

@Controller('user')
@ApiTags('User')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('show/:id')
  async show(@Param('id') id: string) {
    return this.userService.getById(id)
  }

  @Get('ranking')
  async ranking() {
    return this.userService.getRanking()
  }
}

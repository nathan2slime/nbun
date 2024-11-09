import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  Req,
  Patch
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { AuthGuard } from '@nestjs/passport'

import { AuthService } from '~/app/auth/auth.service'
import { SignInDto, SignUpDto } from '~/app/auth/auth.dto'
import { Request } from '~/types/app.types'
import { JwtAuthGuard } from '~/app/auth/auth.guard'
import { env } from '~/env'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200
  })
  async auth(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json(req.user)
  }

  @Post('signout')
  @ApiResponse({
    status: 200
  })
  @UseGuards(JwtAuthGuard)
  async signOut(@Req() req: Request, @Res() res: Response) {
    const session = req.user
    await this.authService.signOut(session)
    return res.status(HttpStatus.OK).send()
  }

  @Patch('refresh')
  @UseGuards(AuthGuard('refresh'))
  @ApiResponse({
    status: 200
  })
  async refresh(@Req() req: Request, @Res() res: Response) {
    const session = req.user
    const { accessToken, refreshToken } = session

    res.cookie(
      env.AUTH_COOKIE,
      { accessToken, refreshToken },
      {
        httpOnly: true,
        expires: new Date(
          Date.now() + require('ms')(env.REFRESH_TOKEN_EXPIRES_IN)
        )
      }
    )
    return res.status(HttpStatus.OK).json(session)
  }

  @Post('signin')
  @ApiResponse({ status: 200 })
  async signIn(@Body() body: SignInDto, @Res() res: Response) {
    const data = await this.authService.signIn(body)

    const { accessToken, refreshToken } = data

    res.cookie(
      env.AUTH_COOKIE,
      { accessToken, refreshToken },
      {
        httpOnly: true,
        expires: new Date(
          Date.now() + require('ms')(env.REFRESH_TOKEN_EXPIRES_IN)
        )
      }
    )
    return res.status(HttpStatus.OK).json(data)
  }

  @Post('signup')
  @ApiResponse({ status: 200 })
  async signUp(@Body() body: SignUpDto, @Res() res: Response) {
    const data = await this.authService.signUp(body)

    const { accessToken, refreshToken } = data

    res.cookie(
      env.AUTH_COOKIE,
      { accessToken, refreshToken },
      {
        httpOnly: true,
        expires: new Date(
          Date.now() + require('ms')(env.REFRESH_TOKEN_EXPIRES_IN)
        )
      }
    )
    return res.status(HttpStatus.OK).json(data)
  }
}

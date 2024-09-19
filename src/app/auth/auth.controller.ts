import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { SignInDto, SignUpDto } from '~/app/auth/auth.dto';
import { JwtAuthGuard } from '~/app/auth/auth.guard';
import { AuthService } from '~/app/auth/auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() payload: SignUpDto, @Res() res: Response) {
    const data = await this.authService.signUp(payload);

    return res.status(HttpStatus.CREATED).json(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async auth(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json(req.user);
  }

  @Post('signin')
  async signIp(@Body() payload: SignInDto, @Res() res: Response) {
    const data = await this.authService.signIn(payload);

    return res.status(HttpStatus.OK).json(data);
  }
}

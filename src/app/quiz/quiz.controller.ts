import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Request } from 'express';

import { JwtAuthGuard } from '~/app/auth/auth.guard';
import { SubmitQuizDto } from '~/app/quiz/quiz.dto';
import { QuizService } from '~/app/quiz/quiz.service';

@Controller('quiz')
@ApiTags('Quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create() {
    return this.quizService.create();
  }

  @Get('table/:id')
  async table(@Param('id') quizId: string) {
    return this.quizService.getTable(quizId);
  }

  @Post('answer/:id')
  @UseGuards(JwtAuthGuard)
  async answer(
    @Body() body: SubmitQuizDto[],
    @Req() req: Request,
    @Param('id') quizId: string,
  ) {
    return this.quizService.answer(req.user as unknown as User, body, quizId);
  }

  @Get('show/:id')
  @UseGuards(JwtAuthGuard)
  async show(@Param('id') id: string) {
    return this.quizService.getById(id);
  }
}

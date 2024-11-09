import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '~/app/auth/auth.guard'
import { CreateQuizDto, UpdateQuizDto } from '~/app/quiz/quiz.dto'
import { QuizInterceptor } from '~/app/quiz/quiz.interceptor'
import { QuizService } from '~/app/quiz/quiz.service'
import { Request } from '~/types/app.types'

@ApiTags('Quiz')
@UseGuards(JwtAuthGuard)
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('create')
  async create(@Body() data: CreateQuizDto, @Req() req: Request) {
    return this.quizService.create(data, req.user)
  }

  @Get('show/:id')
  async show(@Param('id') id: string) {
    return this.quizService.getById(id)
  }

  @Get('my')
  async my(@Req() req: Request) {
    return this.quizService.getByUser(req.user.userId)
  }

  @Get('start/:id')
  async start(@Param('id') id: string) {
    return this.quizService.start(id)
  }

  @Put('update/:id')
  @UseInterceptors(QuizInterceptor)
  async update(@Body() data: UpdateQuizDto, @Param('id') id: string) {
    return this.quizService.update(id, data)
  }

  @Delete('delete/:id')
  @UseInterceptors(QuizInterceptor)
  async delete(@Param('id') id: string) {
    return this.quizService.delete(id)
  }
}

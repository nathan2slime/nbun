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
import { ApiHeader, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '~/app/auth/auth.guard'
import { RequestHeaders } from '~/app/decorators/header.decorator'
import { CreateQuizDto, QuizHeader, UpdateQuizDto } from '~/app/quiz/quiz.dto'
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

  @ApiHeader({ name: 'quiz-id' })
  @Get('start')
  @UseInterceptors(QuizInterceptor)
  async start(@RequestHeaders() headers: QuizHeader) {
    return this.quizService.start(headers['quiz-id'])
  }

  @ApiHeader({ name: 'quiz-id' })
  @Put('update')
  @UseInterceptors(QuizInterceptor)
  async update(
    @Body() data: UpdateQuizDto,
    @RequestHeaders() headers: QuizHeader
  ) {
    return this.quizService.update(headers['quiz-id'], data)
  }

  @ApiHeader({ name: 'quiz-id' })
  @Delete('delete')
  @UseInterceptors(QuizInterceptor)
  async delete(@RequestHeaders() headers: QuizHeader) {
    return this.quizService.delete(headers['quiz-id'])
  }
}

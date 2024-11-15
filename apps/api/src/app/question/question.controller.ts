import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '~/app/auth/auth.guard'
import { RequestHeaders } from '~/app/decorators/header.decorator'
import {
  CreateQuestionDto,
  QueryQuestionDto,
  QuestionHeader,
  UpdateQuestionDto
} from '~/app/question/question.dto'
import { QuestionInterceptor } from '~/app/question/question.interceptor'
import { QuestionService } from '~/app/question/question.service'
import { QuizHeader } from '~/app/quiz/quiz.dto'
import { QuizInterceptor } from '~/app/quiz/quiz.interceptor'

@ApiTags('Question')
@Controller('question')
@UseGuards(JwtAuthGuard)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('create')
  @ApiHeader({ name: 'quiz-id' })
  @UseInterceptors(QuizInterceptor)
  async create(
    @Body() data: CreateQuestionDto,
    @RequestHeaders() headers: QuizHeader
  ) {
    const quizId = headers['quiz-id']

    return this.questionService.create(quizId, data)
  }

  @Put('update')
  @ApiHeader({ name: 'question-id' })
  @UseInterceptors(QuestionInterceptor)
  async update(
    @Body() data: UpdateQuestionDto,
    @RequestHeaders() headers: QuestionHeader
  ) {
    return this.questionService.update(headers['question-id'], data)
  }

  @Get('paginate')
  async paginate(@Query() data: QueryQuestionDto) {
    return this.questionService.paginate(data)
  }

  @ApiHeader({ name: 'question-id' })
  @Delete('delete')
  @UseInterceptors(QuestionInterceptor)
  async delete(@RequestHeaders() headers: QuestionHeader) {
    return this.questionService.delete(headers['question-id'])
  }
}

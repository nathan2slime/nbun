import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '~/app/auth/auth.guard'
import {
  CreateQuestionDto,
  QueryQuestionDto,
  UpdateQuestionDto
} from '~/app/question/question.dto'
import { QuestionInterceptor } from '~/app/question/question.interceptor'
import { QuestionService } from '~/app/question/question.service'
import { QuizInterceptor } from '~/app/quiz/quiz.interceptor'

@ApiTags('Question')
@Controller('question')
@UseGuards(JwtAuthGuard)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('create')
  @UseInterceptors(QuizInterceptor)
  async create(@Body() data: CreateQuestionDto) {
    return this.questionService.create(data)
  }

  @Put('update/:id')
  @UseInterceptors(QuestionInterceptor)
  async update(@Body() data: UpdateQuestionDto, @Param('id') id: string) {
    return this.questionService.update(id, data)
  }

  @Get('paginate')
  async paginate(@Query() data: QueryQuestionDto) {
    return this.questionService.paginate(data)
  }

  @Delete('delete/:id')
  @UseInterceptors(QuestionInterceptor)
  async delete(@Param('id') id: string) {
    return this.questionService.delete(id)
  }
}

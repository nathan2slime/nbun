import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
  CreateQuestionOptionDto,
  QueryQuestionOptionDto,
  UpdateQuestionOptionDto
} from '~/app/question-option/question-option.dto'
import { QuestionOptionInterceptor } from '~/app/question-option/question-option.interceptor'
import { QuestionOptionService } from '~/app/question-option/question-option.service'
import { QuestionInterceptor } from '~/app/question/question.interceptor'
import { QuestionService } from '~/app/question/question.service'
import { MAX_QUESTION_OPTIONS_REACHED_MESSAGE } from '~/errors'

@ApiTags('QuestionOption')
@UseGuards(JwtAuthGuard)
@Controller('question/option')
export class QuestionOptionController {
  constructor(
    private readonly questionOptionService: QuestionOptionService,
    private readonly questionService: QuestionService
  ) {}

  @Post('create')
  @UseInterceptors(QuestionInterceptor)
  async create(@Body() body: CreateQuestionOptionDto) {
    const quantityOptions =
      await this.questionOptionService.getQuantityByQuestionId(body.questionId)

    if (quantityOptions >= this.questionService.getMaxOptions())
      throw new HttpException(
        MAX_QUESTION_OPTIONS_REACHED_MESSAGE,
        HttpStatus.BAD_REQUEST
      )

    return this.questionOptionService.create(body)
  }

  @Put('update/:id')
  @UseInterceptors(QuestionOptionInterceptor)
  async update(@Param('id') id: string, @Body() data: UpdateQuestionOptionDto) {
    return this.questionOptionService.update(data, id)
  }

  @Get('paginate')
  async paginate(@Query() data: QueryQuestionOptionDto) {
    return this.questionOptionService.paginate(data)
  }

  @Get('show/:id')
  @UseInterceptors(QuestionOptionInterceptor)
  async show(@Param('id') id: string) {
    return this.questionOptionService.show(id)
  }

  @Delete('delete/:id')
  @UseInterceptors(QuestionOptionInterceptor)
  async delete(@Param('id') id: string) {
    return this.questionOptionService.delete(id)
  }
}

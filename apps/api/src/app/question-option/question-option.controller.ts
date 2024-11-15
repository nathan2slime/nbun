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
import { ApiHeader, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '~/app/auth/auth.guard'
import { RequestHeaders } from '~/app/decorators/header.decorator'
import {
  CreateQuestionOptionDto,
  QueryQuestionOptionDto,
  QuestionOptionHeader,
  UpdateQuestionOptionDto
} from '~/app/question-option/question-option.dto'
import { QuestionOptionInterceptor } from '~/app/question-option/question-option.interceptor'
import { QuestionOptionService } from '~/app/question-option/question-option.service'
import { QuestionHeader } from '~/app/question/question.dto'
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

  @ApiHeader({ name: 'question-id' })
  @Post('create')
  @UseInterceptors(QuestionInterceptor)
  async create(
    @Body() body: CreateQuestionOptionDto,
    @RequestHeaders() headers: QuestionHeader
  ) {
    const quantityOptions =
      await this.questionOptionService.getQuantityByQuestionId(
        headers['question-id']
      )

    if (quantityOptions >= this.questionService.getMaxOptions())
      throw new HttpException(
        MAX_QUESTION_OPTIONS_REACHED_MESSAGE,
        HttpStatus.BAD_REQUEST
      )

    return this.questionOptionService.create(headers['question-id'], body)
  }

  @ApiHeader({ name: 'question-option-id' })
  @Put('update')
  @UseInterceptors(QuestionOptionInterceptor)
  async update(
    @RequestHeaders() headers: QuestionOptionHeader,
    @Body() data: UpdateQuestionOptionDto
  ) {
    return this.questionOptionService.update(
      data,
      headers['question-option-id']
    )
  }

  @Get('paginate')
  @ApiHeader({ name: 'question-id' })
  @ApiHeader({ name: 'question-option-id' })
  async paginate(@RequestHeaders() headers: QuestionHeader) {
    return this.questionOptionService.paginate({
      questionId: headers['question-id']
    })
  }

  @ApiHeader({ name: 'question-option-id' })
  @Get('show')
  @UseInterceptors(QuestionOptionInterceptor)
  async show(@RequestHeaders() headers: QuestionHeader) {
    return this.questionOptionService.show(headers['question-id'])
  }

  @ApiHeader({ name: 'question-option-id' })
  @Delete('delete')
  @UseInterceptors(QuestionOptionInterceptor)
  async delete(@RequestHeaders() headers: QuestionOptionHeader) {
    return this.questionOptionService.delete(headers['question-option-id'])
  }
}

import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '~/app/auth/auth.guard'
import { CreateQuestionOptionDto } from '~/app/question-option/question-option.dto'
import { QuestionOptionService } from '~/app/question-option/question-option.service'
import { MAX_QUESTION_OPTIONS_REACHED_MESSAGE } from '~/errors'

const MAX_OPTIONS_IN_QUESTION = 4

@ApiTags('QuestionOption')
@UseGuards(JwtAuthGuard)
@Controller('question/option')
export class QuestionOptionController {
  constructor(private readonly questionOptionService: QuestionOptionService) {}

  @Post('create')
  async create(@Body() body: CreateQuestionOptionDto) {
    const quantityOptions =
      await this.questionOptionService.getQuantityByQuestionId(body.questionId)

    if (quantityOptions >= MAX_OPTIONS_IN_QUESTION)
      throw new HttpException(
        MAX_QUESTION_OPTIONS_REACHED_MESSAGE,
        HttpStatus.BAD_REQUEST
      )

    return this.questionOptionService.create(body)
  }
}

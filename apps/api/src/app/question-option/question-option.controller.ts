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
  UseGuards
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '~/app/auth/auth.guard'
import {
  CreateQuestionOptionDto,
  UpdateQuestionOptionDto
} from '~/app/question-option/question-option.dto'
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

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() data: UpdateQuestionOptionDto) {
    return this.questionOptionService.update(data, id)
  }

  @Get('paginate/:questionId')
  async paginate(@Param('questionId') questionId: string) {
    return this.questionOptionService.paginate({ questionId })
  }

  @Get('show/:id')
  async show(@Param('id') id: string) {
    return this.questionOptionService.show(id)
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.questionOptionService.delete(id)
  }
}

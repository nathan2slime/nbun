import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { QuestionOptionService } from '~/app/question-option/question-option.service'
import {
  CreateQuestionDto,
  QueryQuestionDto,
  UpdateQuestionDto
} from '~/app/question/question.dto'
import { QuestionService } from '~/app/question/question.service'

@ApiTags('Question')
@Controller('question')
@UseGuards()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('create')
  async create(@Body() data: CreateQuestionDto) {
    return this.questionService.create(data)
  }

  @Put('update/:id')
  async update(@Body() data: UpdateQuestionDto, @Param('id') id: string) {
    return this.questionService.update(id, data)
  }

  @Get('paginate')
  async paginate(@Query() data: QueryQuestionDto) {
    return this.questionService.paginate(data)
  }

  @Delete('delete/:id')
  async delete(@Param('id') questionId: string) {
    return this.questionService.delete(questionId)
  }
}

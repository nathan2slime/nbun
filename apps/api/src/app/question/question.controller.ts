import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import {
  CreateQuestionDto,
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
}

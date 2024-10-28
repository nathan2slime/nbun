import { Body, Controller, Post } from '@nestjs/common'

import { CreateQuestionDto } from '~/app/question/question.dto'
import { QuestionService } from '~/app/question/question.service'

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('create')
  async create(@Body() data: CreateQuestionDto) {
    return this.questionService.create(data)
  }
}

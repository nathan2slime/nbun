import { Injectable } from '@nestjs/common'

import { CreateQuestionOptionDto } from '~/app/question-option/question-option.dto'
import { QuestionOptionService } from '~/app/question-option/question-option.service'
import { CreateQuestionDto } from '~/app/question/question.dto'
import { PrismaService } from '~/database/prisma.service'

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ quizId, ...payload }: CreateQuestionDto) {
    return this.prisma.question.create({
      data: { ...payload, quiz: { connect: { id: quizId } } }
    })
  }

  async delete(id: string) {
    return this.prisma.question.delete({ where: { id } })
  }
}

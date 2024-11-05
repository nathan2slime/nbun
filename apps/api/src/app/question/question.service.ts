import { Injectable } from '@nestjs/common'

import {
  CreateQuestionDto,
  UpdateQuestionDto
} from '~/app/question/question.dto'
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

  async update(id: string, data: UpdateQuestionDto) {
    return this.prisma.question.update({ where: { id }, data })
  }
}

import { Injectable } from '@nestjs/common'

import {
  CreateQuestionOptionDto,
  QueryQuestionOptionDto,
  UpdateQuestionOptionDto
} from '~/app/question-option/question-option.dto'
import { PrismaService } from '~/database/prisma.service'

@Injectable()
export class QuestionOptionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(questionId: string, { ...data }: CreateQuestionOptionDto) {
    return this.prisma.questionOption.create({
      data: {
        ...data,
        question: {
          connect: {
            id: questionId
          }
        }
      }
    })
  }

  async paginate(data: QueryQuestionOptionDto) {
    return this.prisma.questionOption.findMany({ where: data })
  }

  async getQuantityByQuestionId(questionId: string) {
    return this.prisma.questionOption.count({
      where: {
        questionId
      }
    })
  }

  async update(data: UpdateQuestionOptionDto, id: string) {
    return this.prisma.questionOption.update({ where: { id }, data })
  }

  async delete(id: string) {
    return this.prisma.questionOption.delete({ where: { id } })
  }

  async show(id: string) {
    return this.prisma.questionOption.findMany({ where: { id } })
  }
}

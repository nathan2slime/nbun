import { Injectable } from '@nestjs/common'
import { Difficulty } from '@prisma/client'

import {
  CreateQuestionDto,
  QueryQuestionDto,
  UpdateQuestionDto
} from '~/app/question/question.dto'
import { PrismaService } from '~/database/prisma.service'

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  timeRule: Record<Difficulty, number> = {
    EASY: 15,
    MEDIUM: 25,
    HARD: 35
  }

  scoringRule: Record<Difficulty, number> = {
    EASY: 1,
    HARD: 2,
    MEDIUM: 3
  }

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

  async paginate(data: QueryQuestionDto) {
    return this.prisma.question.findMany({ where: { quizId: data.quizId } })
  }

  async getGameRule(quizId: string) {
    const levels = await this.prisma.question.findMany({
      where: { quizId },
      select: {
        difficulty: true
      }
    })

    return levels.map(level => ({
      ...level,
      time: this.timeRule[level.difficulty]
    }))
  }
}

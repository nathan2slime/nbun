import { Difficulty } from '@nbun/database'
import { Injectable } from '@nestjs/common'

import {
  CreateQuestionDto,
  QueryQuestionDto,
  UpdateQuestionDto
} from '~/app/question/question.dto'
import { PrismaService } from '~/database/prisma.service'

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  maxOptions = 4

  timeRule: Record<Difficulty, number> = {
    EASY: 30,
    MEDIUM: 60,
    HARD: 75
  }

  scoringRule: Record<Difficulty, number> = {
    EASY: 5,
    HARD: 10,
    MEDIUM: 15
  }

  getMaxOptions() {
    return this.maxOptions
  }

  async create(quizId: string, payload: CreateQuestionDto) {
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
        id: true,
        difficulty: true
      }
    })

    return levels.map(level => ({
      ...level,
      time: this.timeRule[level.difficulty]
    }))
  }
}

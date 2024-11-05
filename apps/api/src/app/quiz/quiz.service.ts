import { Injectable } from '@nestjs/common'
import { Session } from '@prisma/client'

import { CreateQuizDto, UpdateQuizDto } from '~/app/quiz/quiz.dto'
import { PrismaService } from '~/database/prisma.service'

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateQuizDto, session: Session) {
    return this.prisma.quiz.create({
      data: {
        ...data,
        createdBy: {
          connect: {
            id: session.userId
          }
        }
      }
    })
  }

  async getById(id: string) {
    return this.prisma.quiz.findUnique({
      where: { id }
    })
  }

  async delete(id: string) {
    return this.prisma.quiz.update({
      where: { id },
      data: { deletedAt: new Date() }
    })
  }

  async update(id: string, data: UpdateQuizDto) {
    return this.prisma.quiz.update({
      where: {
        id
      },
      data
    })
  }
}

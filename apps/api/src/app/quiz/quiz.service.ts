import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

import { CreateQuizDto, UpdateQuizDto } from '~/app/quiz/quiz.dto'
import { PrismaService } from '~/database/prisma.service'

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateQuizDto, user: User) {
    return this.prisma.quiz.create({
      data: {
        ...data,
        createdBy: {
          connect: {
            id: user.id
          }
        }
      }
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

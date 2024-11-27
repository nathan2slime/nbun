import { Injectable } from '@nestjs/common'

import {
  CreateQuizResponseDto,
  WhereQuizResponseDto
} from '~/app/quiz-response/quiz-response.dto'
import { PrismaService } from '~/database/prisma.service'

@Injectable()
export class QuizResponseService {
  constructor(private readonly prisma: PrismaService) {}

  async findBy(data: WhereQuizResponseDto) {
    return this.prisma.quizResponse.findFirst({
      where: data
    })
  }

  async findOrCreate(data: CreateQuizResponseDto) {
    return this.prisma.quizResponse.upsert({
      where: {
        userId: data.userId,
        quizId: data.quizId
      },
      update: {},
      create: {
        quiz: {
          connect: {
            id: data.quizId
          }
        },
        user: {
          connect: {
            id: data.userId
          }
        }
      }
    })
  }

  async create(data: CreateQuizResponseDto) {
    return this.prisma.quizResponse.create({
      data: {
        quiz: {
          connect: {
            id: data.quizId
          }
        },
        user: {
          connect: {
            id: data.userId
          }
        }
      }
    })
  }
}

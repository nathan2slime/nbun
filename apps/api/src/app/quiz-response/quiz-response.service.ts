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
      where: data,
      include: {
        responses: true
      }
    })
  }

  async paginate(quizId: string) {
    return this.prisma.quizResponse.findMany({
      where: {
        quizId
      },
      include: {
        responses: true
      }
    })
  }

  async findOrCreate(data: CreateQuizResponseDto) {
    const res = await this.prisma.quizResponse.findFirst({
      where: {
        userId: data.userId,
        quizId: data.quizId
      }
    })

    return res ?? this.create(data)
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

import { Injectable } from '@nestjs/common'

import { CreateQuestionResponseDto } from '~/app/question-response/question-response.dto'
import { QuizResponseService } from '~/app/quiz-response/quiz-response.service'
import { PrismaService } from '~/database/prisma.service'

@Injectable()
export class QuestionResponseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly quizResponse: QuizResponseService
  ) {}

  async create(
    { quizId, questionOptionId, questionId }: CreateQuestionResponseDto,
    userId: string
  ) {
    const quizResponse = await this.quizResponse.findOrCreate({
      quizId,
      userId
    })

    const response = await this.findByUserAndQuestion(userId, questionId)

    return (
      response ??
      this.prisma.questionResponse.create({
        data: {
          quizResponse: { connect: { id: quizResponse.id } },
          selectedOption: {
            connect: {
              id: questionOptionId
            }
          },
          question: {
            connect: {
              id: questionId
            }
          }
        }
      })
    )
  }

  async findByUserAndQuestion(userId: string, questionId: string) {
    return this.prisma.questionResponse.findFirst({
      where: {
        questionId,
        quizResponse: {
          userId
        }
      }
    })
  }

  async findById(id: string, userId: string) {
    return this.prisma.questionResponse.findFirst({
      where: {
        id,
        quizResponse: {
          userId
        }
      }
    })
  }
}

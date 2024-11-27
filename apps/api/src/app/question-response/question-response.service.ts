import { QuizResponse } from '@nbun/database'
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
    let quizResponse: QuizResponse | undefined = undefined

    quizResponse = await this.quizResponse.findBy({ quizId, userId })

    if (!quizResponse)
      quizResponse = await this.quizResponse.create({ quizId, userId })

    return this.prisma.questionResponse.create({
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

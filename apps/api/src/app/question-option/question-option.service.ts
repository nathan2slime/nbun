import {
  CreateQuestionOptionDto,
  QueryQuestionOptionDto
} from '~/app/question-option/question-option.dto'
import { PrismaService } from '~/database/prisma.service'

export class QuestionOptionService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ questionId, ...data }: CreateQuestionOptionDto) {
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
}

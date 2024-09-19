import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { QuestionService } from '~/app/question/question.service';
import { SubmitQuizDto } from '~/app/quiz/quiz.dto';
import { PrismaService } from '~/database';

@Injectable()
export class QuizService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly questionService: QuestionService,
  ) {}

  async getTable(quizId: string) {
    return this.prisma.score.findMany({
      where: {
        quizId,
      },
    });
  }

  async answer(user: User, data: SubmitQuizDto[], quizId: string) {
    const points = await Promise.all(
      data.map(async (e) => {
        const question = await this.prisma.question.findUnique({
          where: { id: e.id },
        });

        return question.answer == e.value ? 1 : 0;
      }),
    );

    const value = points.reduce((acc, current) => acc + current, 0);

    const score = await this.prisma.score.findFirst({
      where: {
        userId: user.id,
        quizId,
      },
    });

    score
      ? await this.prisma.score.update({
          where: { id: score.id },
          data: {
            value,
          },
        })
      : await this.prisma.score.create({
          data: {
            user: { connect: { id: user.id } },
            quiz: { connect: { id: quizId } },
            value,
          },
        });
  }

  async getById(id: string) {
    return this.prisma.quiz.findUnique({
      where: { id },
      include: {
        quizQuestion: {
          include: {
            question: true,
          },
        },
      },
    });
  }

  async create() {
    const questions = await this.questionService.getShuffleGroup();

    return this.prisma.quiz.create({
      data: {
        quizQuestion: {
          createMany: {
            data: questions.map((e) => ({ questionId: e.id })),
          },
        },
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { Question } from '@prisma/client';

import { PrismaService } from '~/database';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  getShuffleGroup() {
    return this.prisma.$queryRawUnsafe<Question[]>(
      'SELECT * FROM Question ORDER BY RANDOM() LIMIT 20;',
    );
  }
}

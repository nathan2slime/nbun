import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { mergeMap } from 'rxjs'

import { QuizService } from '~/app/quiz/quiz.service'
import { FORBIDDEN_QUIZ_MESSAGE } from '~/errors'

@Injectable()
export class QuestionOptionInterceptor implements NestInterceptor {
  constructor(private readonly quizService: QuizService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      mergeMap(async () => {
        const request = context.switchToHttp().getRequest()
        const session = request.user

        const quizId = request.headers.quiz
        const questionId = request.headers.question
        const questionOptionId = request.params.id || request.params.option
        const userId = session.userId

        const isOwner = await this.quizService.isQuestionOptionOwner(
          quizId,
          questionOptionId,
          questionId,
          userId
        )

        if (!isOwner)
          throw new HttpException(FORBIDDEN_QUIZ_MESSAGE, HttpStatus.FORBIDDEN)
      })
    )
  }
}

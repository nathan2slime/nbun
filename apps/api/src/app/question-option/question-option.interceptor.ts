import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { from, throwError } from 'rxjs'
import { switchMap, catchError } from 'rxjs/operators'

import { QuizService } from '~/app/quiz/quiz.service'
import { FORBIDDEN_QUIZ_MESSAGE } from '~/errors'

@Injectable()
export class QuestionOptionInterceptor implements NestInterceptor {
  constructor(private readonly quizService: QuizService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest()
    const session = request.user

    const quizId = request.headers.quiz
    const questionId = request.headers.question
    const questionOptionId = request.params.id || request.params.option
    const userId = session.userId

    return from(
      this.quizService.isQuestionOptionOwner(
        quizId,
        questionOptionId,
        questionId,
        userId
      )
    ).pipe(
      switchMap(isOwner => {
        console.log(isOwner)

        if (isOwner) return next.handle()

        return throwError(
          () => new HttpException(FORBIDDEN_QUIZ_MESSAGE, HttpStatus.FORBIDDEN)
        )
      }),
      catchError(err => throwError(() => err))
    )
  }
}

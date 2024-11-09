import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { tap } from 'rxjs'

import { QuizService } from '~/app/quiz/quiz.service'
import { FORBIDDEN_QUIZ_MESSAGE } from '~/errors'

@Injectable()
export class QuizInterceptor implements NestInterceptor {
  constructor(private readonly quizService: QuizService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      tap(async () => {
        const request = context.switchToHttp().getRequest()
        const session = request.user

        const quizId = request.params.id
        const userId = session.userId

        const isOwner = await this.quizService.isOwner(quizId, userId)

        if (!isOwner)
          throw new HttpException(FORBIDDEN_QUIZ_MESSAGE, HttpStatus.FORBIDDEN)
      })
    )
  }
}

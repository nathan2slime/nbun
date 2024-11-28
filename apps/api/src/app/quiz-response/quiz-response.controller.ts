import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '~/app/auth/auth.guard'
import { QuizResponseService } from '~/app/quiz-response/quiz-response.service'
import { Request } from '~/types/app.types'

@Controller('response')
@ApiTags('Response')
@UseGuards(JwtAuthGuard)
export class QuizResponseController {
  constructor(private readonly quizResponseService: QuizResponseService) {}

  @Get('/show/:quizId')
  async show(@Req() req: Request, @Param('quizId') quizId: string) {
    const session = req.user
    const userId = session.userId

    return this.quizResponseService.findBy({ quizId, userId })
  }

  @Get('/paginate/:quizId')
  async paginate(@Param('quizId') quizId: string) {
    return this.quizResponseService.paginate(quizId)
  }
}

import { Module } from '@nestjs/common'

import { QuizMemberService } from '~/app/quiz-member/quiz-member.service'

@Module({
  exports: [QuizMemberService],
  providers: [QuizMemberService]
})
export class QuizMemberModule {}

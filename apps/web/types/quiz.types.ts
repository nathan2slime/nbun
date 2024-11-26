import { QuestionOption } from '@nbun/database'

import { QuestionQuizFormData } from '~/lib/schemas/quiz.schemas'

export type UpdateQuizPayload = CreateQuizPayload

export type CreateQuizPayload = {
  title: string
}

export type QuestionQuizPayload = QuestionQuizFormData

export type QuestionQuizResponse = {
  id: string
  title: string
  quizId: string
  difficulty: Difficulty
  options: OptionResponse
}

export enum Difficulty {
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  EASY = 'EASY'
}

export type CreateOptionPayload = Omit<QuestionOption, 'id'>
export type OptionResponse = QuestionOption

export type UpdateOptionPayload = {
  title: string
  id: string
}

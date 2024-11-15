import { QuestionQuizFormData } from '~/lib/schemas/quiz.schemas'

export type Quiz = {
  id: string
  title: string
  userId: string
  createdAt: Date
  updatedAt: Date
  startAt: Date | null
}

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
}

export enum Difficulty {
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  EASY = 'EASY'
}

export type CreateOptionPayload = {
  title: string
  questionId: string
  quizId: string
}

export type OptionResponse = CreateOptionPayload & {
  id: string
}

export type UpdateOptionPayload = {
  title: string
  id: string
}

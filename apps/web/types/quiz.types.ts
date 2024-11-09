export type QuizResponse = {
  id: string
  title: string
  userId: string
  createdAt: Date
  updatedAt: Date
  startAt: Date | null
}

export type UpdateQuizPayload = CreateQuizPayload & {
  id: string
}

export type CreateQuizPayload = {
  title: string
}

export type QuestionQuizFormData = {
  title: string
  difficulty: 'MEDIUM' | 'HARD' | 'EASY'
}

export type QuestionQuizPayload = QuestionQuizFormData & {
  quizId: string
}

export type QuestionQuizResponse = {
  id: string
  title: string
  quizId: string
  difficulty: 'MEDIUM' | 'HARD' | 'EASY'
}

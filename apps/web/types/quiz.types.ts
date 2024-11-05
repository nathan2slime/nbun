export type QuizResponse = {
  id: string
  title: string
  userId: string
  createdAt: string
  updatedAt: string
  startAt: string | null
}

export type QuizPayload = {
  id: string
  title: string
}

export type QuestionQuizPayload = {
  title: string
  quizId: string
}

export type QuestionQuizResponse = {
  id: string
  title: string
  quizId: string
  difficulty: 'MEDIUM' | 'HARD' | 'EASY'
}

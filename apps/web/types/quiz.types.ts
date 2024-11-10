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
  difficulty: Difficulty
}

export type QuestionQuizPayload = QuestionQuizFormData & {
  quizId: string
}

export type QuestionQuizResponse = {
  id: string
  title: string
  quizId: string
  difficulty: Difficulty
}

export type Difficulty = 'MEDIUM' | 'HARD' | 'EASY'

export type CreateOptionPayload = {
  title: string
  questionId: string
}

export type CreateOptionResponse = CreateOptionPayload & {}

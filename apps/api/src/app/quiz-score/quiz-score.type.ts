export type UpdateQuizRanking = {
  quizId: string
  userId: string
  newScore: number
}

export type GetUserScore = {
  quizId: string
  userId: string
}

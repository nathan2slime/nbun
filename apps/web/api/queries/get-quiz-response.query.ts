import { QuestionResponse, QuizResponse } from '@nbun/database'

import { api } from '~/api/server'

type Response = QuizResponse & {
  responses: QuestionResponse
}

export const getQuizResponseQuery = async (quizId: string) => {
  const { data } = await api.get<Response>(`/response/${quizId}`)

  return data
}

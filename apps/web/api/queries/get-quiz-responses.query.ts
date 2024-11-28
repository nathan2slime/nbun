import { QuestionResponse, QuizResponse } from '@nbun/database'

import { api } from '~/api/server'

type Response = (QuizResponse & {
  responses: QuestionResponse[]
})[]

export const getQuizResponsesQuery = async (quizId: string) => {
  const { data } = await api.get<Response>(`/response/paginate/${quizId}`)

  return data
}

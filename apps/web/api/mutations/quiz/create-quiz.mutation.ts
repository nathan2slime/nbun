import { api } from '~/api/client'
import { QuizPayload, QuizResponse } from '~/types/quiz.types'

export const createQuizMutation = async (payload: QuizPayload) => {
  const { data } = await api.post<QuizResponse>('/quiz/create', payload)

  return data
}

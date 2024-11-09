import { api } from '~/api/client'
import { QuizResponse, CreateQuizPayload } from '~/types/quiz.types'

export const createQuizMutation = async (payload: CreateQuizPayload) => {
  const { data } = await api.post<QuizResponse>('/quiz/create', payload)

  return data
}

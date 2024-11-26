import { api } from '~/api/client'
import { CreateQuizPayload, Quiz } from '~/types/quiz.types'

export const createQuizMutation = async (payload: CreateQuizPayload) => {
  const { data } = await api.post<Quiz>('/quiz/create', payload)

  return data
}

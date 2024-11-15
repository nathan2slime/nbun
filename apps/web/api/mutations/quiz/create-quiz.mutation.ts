import { api } from '~/api/client'
import { Quiz, CreateQuizPayload } from '~/types/quiz.types'

export const createQuizMutation = async (payload: CreateQuizPayload) => {
  const { data } = await api.post<Quiz>('/quiz/create', payload)

  return data
}

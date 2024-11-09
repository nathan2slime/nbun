import { api } from '~/api/client'
import { UpdateQuizPayload, QuizResponse } from '~/types/quiz.types'

export const updateQuizMutation = async (payload: UpdateQuizPayload) => {
  const { data } = await api.put<QuizResponse>(`/quiz/update/${payload.id}`, {
    title: payload.title
  })
  return data
}

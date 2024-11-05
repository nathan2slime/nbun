import { api } from '~/api/client'
import { QuizPayload, QuizResponse } from '~/types/quiz.types'

export const updateQuizMutation = async (payload: QuizPayload) => {
  console.log(payload)

  const { data } = await api.put<QuizResponse>(`/quiz/update/${payload.id}`, {
    title: payload.title
  })
  return data
}

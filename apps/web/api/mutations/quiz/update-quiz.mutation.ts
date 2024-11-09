import { api } from '~/api/client'
import { UpdateQuizPayload, QuizResponse } from '~/types/quiz.types'

export const updateQuizMutation = async (payload: UpdateQuizPayload) => {
  console.log(payload)

  const { data } = await api.put<QuizResponse>(`/quiz/update/${payload.id}`, {
    title: payload.title
  })

  console.log({ data: data })

  return data
}

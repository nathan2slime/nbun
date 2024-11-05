import { api } from '~/api/client'
import { QuestionQuizPayload, QuestionQuizResponse } from '~/types/quiz.types'

export const createQuestionMutation = async (payload: QuestionQuizPayload) => {
  const { data } = await api.post<QuestionQuizResponse>('/quiz/create', payload)

  return data
}

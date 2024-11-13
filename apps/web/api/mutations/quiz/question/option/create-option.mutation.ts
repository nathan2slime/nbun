import { api } from '~/api/client'
import { CreateOptionPayload, OptionResponse } from '~/types/quiz.types'

export const createOptionMutation = async ({
  quizId,
  ...payload
}: CreateOptionPayload) => {
  const { data } = await api.post<OptionResponse>(
    '/question/option/create',
    payload,
    {
      headers: {
        quiz: quizId,
        question: payload.questionId
      }
    }
  )

  return data
}

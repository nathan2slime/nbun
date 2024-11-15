import { api } from '~/api/client'
import { CreateOptionPayload, OptionResponse } from '~/types/quiz.types'

export const createOptionMutation = async ({
  quizId,
  questionId,
  ...payload
}: CreateOptionPayload) => {
  const { data } = await api.post<OptionResponse>(
    '/question/option/create',
    payload,
    {
      headers: {
        'quiz-id': quizId,
        'question-id': questionId
      }
    }
  )

  return data
}

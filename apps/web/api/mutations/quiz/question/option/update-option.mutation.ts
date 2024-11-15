import { api } from '~/api/client'
import { OptionResponse, UpdateOptionPayload } from '~/types/quiz.types'

type UpdateOptionMutation = {
  payload: UpdateOptionPayload
  quiz: string
  question: string
}

export const updateOptionMutation = async ({
  payload: { id, ...payload },
  quiz,
  question
}: UpdateOptionMutation) => {
  const { data } = await api.put<OptionResponse>(
    '/question/option/update',
    payload,
    {
      headers: {
        'question-option-id': id,
        'quiz-id': quiz,
        'question-id': question
      }
    }
  )

  return data
}

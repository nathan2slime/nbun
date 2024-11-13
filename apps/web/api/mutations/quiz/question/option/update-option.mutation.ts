import { api } from '~/api/client'
import { OptionResponse, UpdateOptionPayload } from '~/types/quiz.types'

type UpdateOptionMutation = {
  payload: UpdateOptionPayload
  quiz: string
  question: string
}

export const updateOptionMutation = async ({
  payload,
  quiz,
  question
}: UpdateOptionMutation) => {
  const { data } = await api.put<OptionResponse>(
    '/question/option/update/' + payload.id,
    {
      title: payload.title
    },
    {
      headers: {
        quiz,
        question
      }
    }
  )

  return data
}

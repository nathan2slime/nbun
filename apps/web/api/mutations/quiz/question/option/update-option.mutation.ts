import { api } from '~/api/client'
import { OptionResponse, UpdateOptionPayload } from '~/types/quiz.types'

export const updateOptionMutation = async (payload: UpdateOptionPayload) => {
  const { data } = await api.put<OptionResponse>(
    '/question/option/update/' + payload.id,
    {
      title: payload.title
    }
  )

  return data
}

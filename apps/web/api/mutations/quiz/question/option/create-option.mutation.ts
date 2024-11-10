import { api } from '~/api/client'
import { CreateOptionPayload, CreateOptionResponse } from '~/types/quiz.types'

export const createOptionMutation = async (payload: CreateOptionPayload) => {
  const { data } = await api.post<CreateOptionResponse>(
    '/question/option/create',
    payload
  )

  return data
}

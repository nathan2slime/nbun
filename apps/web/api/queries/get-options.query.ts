import { api } from '~/api/client'
import { OptionResponse } from '~/types/quiz.types'

export const getOptionsQuery = async (questionId: string) => {
  const { data } = await api.get<OptionResponse[]>(
    '/question/option/paginate/' + questionId
  )

  return data
}

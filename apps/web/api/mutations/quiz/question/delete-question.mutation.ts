import { api } from '~/api/client'

export const deleteQuestionMutation = async (id: string) => {
  const { data } = await api.delete('/question/delete/' + id)

  return data
}

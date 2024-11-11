import { api } from '~/api/client'

export const deleteOptionMutation = async (id: string) => {
  const { data } = await api.delete('/question/option/delete/' + id)

  return data
}

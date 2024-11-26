import { User } from '@nbun/database'

import { api } from '~/api/client'

export const getUserQuery = async (id: string) => {
  const { data } = await api.get<Omit<User, 'password'>>(`/user/show/${id}`)

  return data
}

import { api } from '~/api/server'
import { AuthResponse } from '~/types/auth.types'

export const getSesssionQuery = async () => {
  const { data } = await api.get<AuthResponse>('/auth')

  return data
}

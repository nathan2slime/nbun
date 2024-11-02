import { api } from '~/api/server'
import { AuthResponse } from '~/types/auth.types'

export const refreshSessionMutation = async () => {
  const { data } = await api.patch<AuthResponse>('/auth/refresh')

  return data
}

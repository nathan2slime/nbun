import { api } from '~/api/client'
import { AuthResponse, SigningPayload } from '~/types/auth.types'

export const signingMutation = async (payload: SigningPayload) => {
  const { data } = await api.post<AuthResponse>('/auth/signin', payload)

  return data
}

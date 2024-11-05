import { api } from '~/api/client'
import { AuthResponse, SignUpPayload } from '~/types/auth.types'

export const signUpMutation = async (payload: SignUpPayload) => {
  const { data } = await api.post<AuthResponse>('/auth/signup', payload)

  return data
}

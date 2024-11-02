'use client'

import { authState, AuthState } from '~/store/auth.state'
import { AppChildren } from '~/types'

type Props = AppChildren<{
  state: AuthState
}>

export const AuthProvider = ({ state, children }: Props) => {
  authState.data = state.data
  authState.logged = state.logged

  return <>{children}</>
}

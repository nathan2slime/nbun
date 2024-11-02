import { proxy } from 'valtio'

import { Session } from '~/types/auth.types'

export type AuthState = {
  logged: boolean
  data: Session | null
}

export const storageKey = '@nbun/web'

const INITIAL: AuthState = {
  logged: false,
  data: null
}

export const authState = proxy<AuthState>(INITIAL)

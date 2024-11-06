import { proxy } from 'valtio'

import { Session } from '~/types/auth.types'

export type AuthState = {
  logged: boolean
  session: Session | null
}

export const storageKey = '@nbun/web'

const INITIAL: AuthState = {
  logged: false,
  session: null
}

export const authState = proxy<AuthState>(INITIAL)

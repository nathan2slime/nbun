import { ReactNode } from 'react'

export type AppChildren<T = object> = { children: ReactNode } & T

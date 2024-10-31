import { ReactNode } from 'react'

export type AppChildren<T = {}> = { children: ReactNode } & T

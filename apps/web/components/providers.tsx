'use client'

import { QueryClientProvider, useQuery } from '@tanstack/react-query'

import { getQueryClient } from '~/api/query'
import { AppChildren } from '~/types'

export const Providers = ({ children }: AppChildren) => {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

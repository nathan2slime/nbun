'use client'

import { Toaster } from 'react-hot-toast'
import { QueryClientProvider } from '@tanstack/react-query'

import { getQueryClient } from '~/api/query'
import { AppChildren } from '~/types'

export const Providers = ({ children }: AppChildren) => {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />

      {children}
    </QueryClientProvider>
  )
}

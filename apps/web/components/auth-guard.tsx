import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { AppChildren } from '~/types'
import { Session } from '~/types/auth.types'
import { getSesssionQuery } from '~/api/queries/get-session.query'
import { AuthProvider } from '~/components/auth-state'
import { refreshSessionMutation } from '~/api/mutations/refresh-session.mutation'

export const AuthGuard = async ({ children }: AppChildren) => {
  const header = await headers()
  const pathname = header.get('x-pathname') as string
  const client = new QueryClient()

  const inAuthPage = pathname.includes('auth')

  let session: Session | null = null

  session = await client.fetchQuery({
    queryKey: ['session'],
    queryFn: getSesssionQuery
  })

  if (!session)
    session = await client.fetchQuery({
      queryKey: ['refresh-session'],
      queryFn: refreshSessionMutation
    })

  if (inAuthPage && session) redirect('/')

  if (!inAuthPage && !session) redirect('/auth/signing')

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <AuthProvider state={{ session: session, logged: !!session }}>
        {children}
      </AuthProvider>
    </HydrationBoundary>
  )
}

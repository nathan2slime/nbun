import type { Metadata } from 'next'
import { Baloo_2 } from 'next/font/google'

import { AppChildren } from '~/types'

import { Providers } from '~/components/providers'
import { AuthGuard } from '~/components/auth-guard'

import { cn } from '~/lib/utils'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

import '~/app/globals.css'

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
})

const RootLayout = ({ children }: Readonly<AppChildren>) => (
  <html lang="pt">
    <body className={cn(baloo.className, 'light')}>
      <Providers>
        <AuthGuard>{children}</AuthGuard>
      </Providers>
    </body>
  </html>
)

export default RootLayout

'use client'

import { usePathname } from 'next/navigation'
import { TabBar } from '~/components/tab-bar'
import { AppChildren } from '~/types'

type Props = AppChildren

export const AppLayout = ({ children }: Props) => {
  const pathname = usePathname()

  if (pathname.includes('auth')) return <>{children}</>

  return (
    <div className="h-screen w-screen overflow-y-auto overflow-x-hidden">
      {children}
      <TabBar />
    </div>
  )
}

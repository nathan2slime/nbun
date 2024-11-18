'use client'

import { usePathname } from 'next/navigation'
import { TabBar } from '~/components/tab-bar'
import { AppChildren } from '~/types'

type Props = AppChildren

export const AppLayout = ({ children }: Props) => {
  const pathname = usePathname()

  if (pathname.includes('auth')) return <>{children}</>

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="h-[calc(100%-75px)] w-full overflow-y-auto">
        {children}
      </div>
      <TabBar />
    </div>
  )
}

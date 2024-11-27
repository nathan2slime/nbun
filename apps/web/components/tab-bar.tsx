'use client'

import { CircleUser, HomeIcon, Layers, Medal } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import Link from 'next/link'
import { cn } from '~/lib/utils'

type Item = {
  icon: ReactNode
  title: string
  path: string
}

export const TabBar = () => {
  const pathname = usePathname()

  const items: Item[] = [
    {
      icon: <HomeIcon className="flex-shrink-0" strokeWidth={1.6} width={22} />,
      title: 'Home',
      path: '/'
    },
    {
      icon: <Layers className="flex-shrink-0" strokeWidth={1.6} width={22} />,
      title: 'Quizzes',
      path: '/quizzes'
    },
    {
      icon: <Medal className="flex-shrink-0" strokeWidth={1.6} width={22} />,
      title: 'Ranking',
      path: '/ranking'
    },
    {
      icon: (
        <CircleUser className="flex-shrink-0" strokeWidth={1.6} width={22} />
      ),
      title: 'Conta',
      path: '/profile/my'
    }
  ]

  return (
    <div className="fixed right-0 bottom-0 flex h-[75px] w-full justify-between gap-2 border-t border-t-border bg-card p-2">
      {items.map(e => {
        const isActive =
          e.path === '/' ? pathname === e.path : pathname.includes(e.path)
        return (
          <Link
            href={e.path}
            className={cn(
              isActive
                ? 'font-semibold text-primary'
                : 'font-medium text-card-foreground/75',
              'flex w-full flex-col items-center justify-center gap-1 rounded-lg bg-background p-3 text-xs tracking-wide'
            )}
            key={e.path}
          >
            {e.icon}
            {e.title}
          </Link>
        )
      })}
    </div>
  )
}

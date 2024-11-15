'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { CircleUser, Layers, HomeIcon, Medal } from 'lucide-react'

import { cn } from '~/lib/utils'
import Link from 'next/link'

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
    <div className="bg-card border-t-border fixed bottom-0 right-0 flex h-[75px] w-full justify-between gap-2 border-t p-2">
      {items.map(e => {
        const isActive =
          e.path == '/' ? pathname == e.path : pathname.includes(e.path)
        return (
          <Link
            href={e.path}
            className={cn(
              isActive
                ? 'text-primary font-semibold'
                : 'text-card-foreground/75 font-medium',
              'bg-background flex w-full flex-col items-center justify-center gap-1 rounded-lg p-3 text-xs tracking-wide'
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

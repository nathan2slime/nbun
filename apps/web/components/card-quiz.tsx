'use client'

import { formatRelative } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { MoreVertical } from 'lucide-react'
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { cn } from '~/lib/utils'
import { Quiz } from '~/types/quiz.types'

type Props = {
  data: Quiz
}

export const CardQuiz = ({ data }: Props) => {
  return (
    <Link
      href={`/quizzes/game/${data.id}`}
      className={cn(
        'rounded-md bg-accent/50 p-3',
        data.startAt && 'bg-primary/30'
      )}
    >
      <div className="flex w-full items-center justify-between">
        <h1 className="font-medium text-base text-foreground/80 tracking-wide">
          {data.title}
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical strokeWidth={1.6} width={22} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={`/quizzes/edit/${data.id}`}>
              <DropdownMenuItem>Editar</DropdownMenuItem>
            </Link>
            <Link href={`/quizzes?delete=${data.id}`}>
              <DropdownMenuItem className="bg-destructive text-destructive-foreground">
                Excluir
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-accent-foreground text-xs">
        Criado {formatRelative(data.createdAt, new Date(), { locale: ptBR })}
      </p>
    </Link>
  )
}

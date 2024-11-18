'use client'

import { Quiz } from '@nbun/database'
import { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'

import { socket } from '~/api/client'
import { QuizUser } from '~/components/quiz-user'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { authState } from '~/store/auth.state'

type Connection = {
  quizId: string
  memberId: string
  clientId: string
}

type Props = {
  quiz: Quiz
}

export const QuizView = ({ quiz }: Props) => {
  const { session: data } = useSnapshot(authState)

  const [members, setMembers] = useState<string[]>([])

  const memberId = data!.userId
  const quizId = quiz.id

  const isQuizOwner = memberId == quiz.userId

  const addNewMember = (data: string) => {
    setMembers(prev => {
      const item = prev.find(e => e == data)
      if (!!item) return prev

      return [...prev, data]
    })
  }

  const deleteMember = (connection: Connection) => {
    setMembers(prev => prev.filter(memberId => memberId != connection.memberId))
  }

  useEffect(() => {
    if (socket.disconnected) socket.connect()

    socket.emit('members', { quizId })
    socket.on('members', addNewMember)

    socket.on('join:' + quizId, addNewMember)
    socket.on('leave:' + quizId, deleteMember)
    socket.emit('onquiz', {
      quizId,
      memberId
    })

    if (!isQuizOwner) socket.emit('join', { quizId, memberId })

    return () => {
      socket.off('join:' + quizId)
      socket.off('leave:' + quizId)
      socket.off('members')
      socket.off('connect')

      setMembers([])
      socket.disconnect()
    }
  }, [])

  return (
    <div>
      <div className="flex w-full flex-col gap-1 p-2">
        <h2 className="text-primary text-lg font-semibold tracking-wide">
          {quiz.title}
        </h2>

        <Separator className="mb-2" />

        <div className="border-card-foreground">
          <span className="text-foreground text-sm tracking-wide">Membros</span>
          {members.map(userId => (
            <QuizUser key={userId} userId={userId} />
          ))}
        </div>

        <Separator className="my-3" />

        {isQuizOwner ? (
          <Button disabled={members.length == 0}>INICIAR</Button>
        ) : (
          <Button>Aguardando</Button>
        )}
      </div>
    </div>
  )
}

import { Quiz } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'

import { socket } from '~/api/client'
import { QuizUser } from '~/components/quiz-user'
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

  const addNewMember = (data: string) => {
    setMembers(prev => [...prev, data])
  }

  const deleteMember = (connection: Connection) => {
    setMembers(prev => prev.filter(memberId => memberId != connection.memberId))
  }

  useEffect(() => {
    socket.emit('members', { quizId })
    socket.on('members', addNewMember)
    socket.on('join:' + quizId, addNewMember)
    socket.on('leave:' + quizId, deleteMember)
    socket.emit('onquiz', {
      quizId,
      memberId
    })
    socket.emit('join', { quizId, memberId })

    return () => {
      socket.off('join:' + quizId)
      socket.off('members')
      socket.off('connect')
    }
  }, [])

  return (
    <div>
      <div className="flex w-full flex-col gap-1 p-2">
        {members.map(userId => (
          <QuizUser key={userId} userId={userId} />
        ))}
      </div>
    </div>
  )
}

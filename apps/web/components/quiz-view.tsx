'use client'

import { Question, Quiz } from '@nbun/database'
import { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'

import { socket } from '~/api/client'
import { AnswerQuestion } from '~/components/answer-question'
import { QuizUser } from '~/components/quiz-user'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { authState } from '~/store/auth.state'

type Connection = {
  quizId: string
  memberId: string
  clientId: string
}

type QuestionStart = {
  at: Date
  time: number
  questionId: string
}

type Props = {
  questions: Question[]
  quiz: Quiz
}

export const QuizView = ({ quiz, questions }: Props) => {
  const { session: data } = useSnapshot(authState)

  const [members, setMembers] = useState<string[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Question>()
  const [isStarted, setIsStarted] = useState(false)
  const [timer, setTimer] = useState(0)

  let questionTimer: NodeJS.Timeout | undefined = undefined

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

    if (!isQuizOwner)
      socket.emit('onquiz', {
        quizId,
        memberId
      })

    socket.on('start:' + quizId, args => {
      setIsStarted(true)
    })

    socket.on('start:question:' + quizId, (args: QuestionStart) => {
      const question = questions.find(e => e.id == args.questionId)
      if (question) {
        setCurrentQuestion(question)
        setIsStarted(true)

        setTimer(args.time)

        questionTimer = setInterval(() => {
          setTimer(time => {
            if (time == 0) {
              clearTimeout(questionTimer)

              return 0
            }

            return time - 1
          })
        }, 1000)
      }
    })
    socket.on('finish:question:' + quizId, args => {
      if (questionTimer) clearTimeout(questionTimer)
      setTimer(0)
    })
    socket.on('close:' + quizId, () => {
      setIsStarted(false)
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

  const handleStartQuiz = () => {
    socket.emit('start', {
      quizId
    })
  }

  return (
    <div>
      {!isQuizOwner && isStarted ? (
        <div className="">
          {currentQuestion && (
            <AnswerQuestion timer={timer} question={currentQuestion} />
          )}
        </div>
      ) : (
        <div className="flex w-full flex-col gap-1 p-2">
          <h2 className="text-primary text-lg font-semibold tracking-wide">
            {quiz.title}
          </h2>

          <Separator className="mb-2" />

          <div className="border-card-foreground">
            <span className="text-foreground text-sm tracking-wide">
              Membros
            </span>
            {members.map(userId => (
              <QuizUser key={userId} userId={userId} />
            ))}
          </div>

          <Separator className="my-3" />

          {isQuizOwner ? (
            <Button onClick={handleStartQuiz} disabled={members.length == 0}>
              INICIAR
            </Button>
          ) : (
            <Button>Aguardando</Button>
          )}
        </div>
      )}
    </div>
  )
}

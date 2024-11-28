'use client'

import { Question, QuestionOption, Quiz } from '@nbun/database'
import { useEffect, useRef, useState } from 'react'
import { useSnapshot } from 'valtio'

import { socket } from '~/api/client'
import { AnswerQuestion } from '~/components/answer-question'
import { QuizScoreTable } from '~/components/quiz-score-table'
import { QuizUser } from '~/components/quiz-user'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { authState } from '~/store/auth.state'

type Connection = {
  quizId: string
  memberId: string
  clientId: string
}

type QuestionWithOption = Question & { options: QuestionOption[] }

type Props = {
  questions: QuestionWithOption[]
  quiz: Quiz
}

export const QuizView = ({ quiz, questions }: Props) => {
  const { session: data } = useSnapshot(authState)

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [members, setMembers] = useState<string[]>([])
  const [isStarted, setIsStarted] = useState(false)
  const [time, setTime] = useState(0)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const memberId = data!.userId
  const quizId = quiz.id

  const isQuizOwner = memberId === quiz.userId

  const addNewMember = (data: string) => {
    setMembers(prev => {
      const item = prev.find(e => e === data)
      if (item) return prev

      return [...prev, data]
    })
  }

  const deleteMember = (connection: Connection) => {
    setMembers(prev =>
      prev.filter(memberId => memberId !== connection.memberId)
    )
  }

  const clearTimeout = () => {
    setTime(0)

    if (timeoutRef.current) {
      clearInterval(timeoutRef.current)
    }
  }

  useEffect(() => {
    if (socket.disconnected) socket.connect()

    socket.emit('members', { quizId })
    socket.on('members', addNewMember)
    socket.on(`join:${quizId}`, addNewMember)
    socket.on(`leave:${quizId}`, deleteMember)
    socket.on(`start:${quizId}`, () => setIsStarted(true))
    socket.on(`close:${quizId}`, () => setIsStarted(false))
    socket.emit('onquiz', {
      quizId,
      memberId
    })

    if (!isQuizOwner) {
      socket.emit('join', { quizId, memberId })

      socket.on(`start:${quizId}`, (time: number) => {
        clearTimeout()

        timeoutRef.current = setTimeout(() => {
          setTime(time => {
            if (time === 0) {
              clearTimeout()

              return 0
            }

            return time - 1
          })
        }, time * 1000)
      })

      socket.on(`close:${quizId}`, () => {
        clearTimeout()
      })
    }

    return () => {
      socket.off(`join:${quizId}`)
      socket.off(`leave:${quizId}`)
      socket.off('members')
      socket.off('connect')

      clearTimeout()
      setMembers([])
      socket.disconnect()
    }
  }, [])

  const handleStartQuiz = () => {
    socket.emit('start', {
      quizId
    })
  }

  const currentQuestion = questions[currentQuestionIndex]!

  const onAnswer = (questionOptionId: string) => {
    if (currentQuestion) {
      const questionOption = currentQuestion.options.find(
        e => e.id === questionOptionId
      )

      if (questionOption) {
        socket.emit('')
      }
    }
  }

  return (
    <div>
      {isStarted ? (
        isQuizOwner ? (
          <QuizScoreTable />
        ) : (
          <div>
            {currentQuestion && (
              <AnswerQuestion
                options={currentQuestion.options}
                timer={time}
                onAnswer={onAnswer}
                question={currentQuestion}
              />
            )}
          </div>
        )
      ) : (
        <div className="flex w-full flex-col gap-1 p-2">
          <h2 className="font-semibold text-lg text-primary tracking-wide">
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
            <Button onClick={handleStartQuiz} disabled={members.length === 0}>
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

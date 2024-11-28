'use client'

import { Difficulty, Question, QuestionOption, Quiz } from '@nbun/database'
import { useEffect, useRef, useState } from 'react'
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

type QuestionWithOption = Question & { options: QuestionOption[] }

type Ranking = {
  pontuation: number
  userId: string
}

type Answer = {
  score: number
  userId: string
}

type Props = {
  questions: QuestionWithOption[]
  quiz: Quiz
  ranking: Ranking[]
}

type GameRule = {
  time: number
  id: string
  difficulty: Difficulty
}

type GameSettings = {
  time: number
  rules: GameRule[]
}

export const QuizView = ({ quiz, questions, ...props }: Props) => {
  const { session: data } = useSnapshot(authState)
  const memberId = data!.userId

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>()
  const [members, setMembers] = useState([...props.ranking])
  const [isStarted, setIsStarted] = useState(false)
  const [isAnswered, setIsAnswered] = useState(
    !!members.find(e => e.userId === memberId)
  )

  const [settings, setSettings] = useState<GameSettings>()
  const [time, setTime] = useState<number>()

  const quizTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const quizId = quiz.id

  const isQuizOwner = memberId === quiz.userId

  const addNewMember = (data: string) => {
    setMembers(prev => {
      const item = prev.find(e => e.userId === data)
      if (item) return prev

      return [...prev, { userId: data, pontuation: 0 }]
    })
  }

  const deleteMember = (connection: Connection) => {
    setMembers(prev =>
      prev.filter(({ userId }) => userId !== connection.memberId)
    )
  }

  const clearQuizTimeout = () => {
    setTime(0)

    if (quizTimeoutRef.current) {
      clearTimeout(quizTimeoutRef.current)
    }
  }

  const onTime = async (
    settings: GameSettings,
    question: QuestionWithOption,
    isLastQuestion: boolean = false
  ) => {
    const questionIndex = questions.indexOf(question)
    setCurrentQuestionIndex(questionIndex)
    const gameRule = settings.rules.find(e => e.id === question.id)

    if (gameRule) {
      gameRule.time = gameRule.time + 1

      clearQuizTimeout()
      setTime(gameRule.time)

      await new Promise(resolve => {
        quizTimeoutRef.current = setInterval(() => {
          setTime(time => {
            if (time === 0) {
              resolve(true)
              clearQuizTimeout()

              return undefined
            }

            return time ? time - 1 : gameRule.time
          })
        }, 1000)
      })

      if (isLastQuestion) {
        onEndQuiz()
      } else {
        // Recursive on time ended

        const nextQuestionIndex = (questionIndex || 0) + 1
        const _isLastQuestion = nextQuestionIndex >= questions.length

        onTime(settings, questions[nextQuestionIndex]!, _isLastQuestion)
      }
    }
  }

  const onEndQuiz = () => {
    socket.off(`start:${quizId}`)
    socket.off(`close:${quizId}`)
    setIsStarted(false)
    setIsAnswered(true)
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

      socket.on(`start:${quizId}`, async (gameSettings: GameSettings) => {
        setSettings(gameSettings)
        const question = questions[0]

        if (question) {
          onTime(gameSettings, question)
        }
      })

      socket.on(`close:${quizId}`, () => {
        clearQuizTimeout()
        setIsStarted(false)
      })
    }

    socket.on(`quiz:answer:${quizId}`, async (args: Answer) => {
      setMembers(e =>
        e.map(i =>
          i.userId === args.userId
            ? { pontuation: args.score, userId: args.userId }
            : i
        )
      )
    })

    return () => {
      socket.off(`join:${quizId}`)
      socket.off(`leave:${quizId}`)
      socket.off('members')
      socket.off('connect')

      clearQuizTimeout()
      setMembers(props.ranking)
      socket.disconnect()
    }
  }, [])

  const handleStartQuiz = () => {
    socket.emit('start', {
      quizId
    })
  }

  const currentQuestion = questions[currentQuestionIndex || 0]!

  const onAnswer = (
    questionOptionId: string,
    isLastQuestion: boolean,
    nextQuestionIndex: number
  ) => {
    if (currentQuestion && settings) {
      const questionId = currentQuestion.id
      const questionOption = currentQuestion.options.find(
        e => e.id === questionOptionId
      )

      if (questionOption) {
        const isCorrect = questionOption.correct
        const difficulty = currentQuestion.difficulty

        socket.emit('response', {
          isCorrect,
          difficulty,
          quizId,
          questionOptionId,
          questionId
        })

        if (quizTimeoutRef.current) {
          clearTimeout(quizTimeoutRef.current)

          if (isLastQuestion) {
            onEndQuiz()
          } else {
            onTime(settings, questions[nextQuestionIndex]!, isLastQuestion)
          }
        }
      }
    }
  }

  const isViewAnswer = isStarted && !isQuizOwner

  return (
    <div>
      {isViewAnswer ? (
        <div>
          {currentQuestion && (
            <AnswerQuestion
              options={currentQuestion.options}
              timer={time}
              onAnswer={questionOptionId => {
                const nextQuestionIndex = (currentQuestionIndex || 0) + 1
                const isLastQuestion = nextQuestionIndex >= questions.length

                onAnswer(questionOptionId, isLastQuestion, nextQuestionIndex)
              }}
              question={currentQuestion}
            />
          )}
        </div>
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
            {members.map(user => {
              return (
                <QuizUser
                  points={user.pontuation}
                  key={user.userId}
                  userId={user.userId}
                />
              )
            })}
          </div>

          <Separator className="my-3" />

          {isQuizOwner ? (
            <Button
              onClick={handleStartQuiz}
              disabled={(!!quiz.startAt || isStarted) ?? members.length === 0}
            >
              {quiz.startAt ? 'Quiz finalizado' : 'Iniciar'}
            </Button>
          ) : (
            <Button variant="outline" className="uppercase">
              {isAnswered ? 'Você respondeu tudo' : 'Aguardando o professor'}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

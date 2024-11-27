import { Question, QuestionOption } from '@nbun/database'
import { useEffect, useRef } from 'react'
import { AnswerOption } from '~/components/answer-option'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'

type Props = {
  question: Question
  options: QuestionOption[]
  timer: number
}

export const AnswerQuestion = ({ question, timer, options }: Props) => {
  const initialTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (initialTimeRef.current === null && timer > 0) {
      initialTimeRef.current = timer
    }
  }, [timer])

  const initialTime = initialTimeRef.current || 1
  const progressValue = (timer / initialTime) * 100

  return (
    <div className="flex w-full flex-col items-center justify-start p-4">
      <Progress value={progressValue} />
      <Badge className="mt-2">{timer}</Badge>

      <h2 className="mt-3 font-medium text-2xl text-primary">
        {question.title}
      </h2>

      <div className="mt-4 flex w-full flex-col gap-3">
        {options.map(e => (
          <AnswerOption key={e.id} data={e} />
        ))}
      </div>
    </div>
  )
}

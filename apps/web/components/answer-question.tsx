import { Question, QuestionOption } from '@nbun/database'
import { useEffect, useRef } from 'react'

import { AnswerOption } from '~/components/answer-option'
import { Badge } from '~/components/ui/badge'
import { Progress } from '~/components/ui/progress'
import { Separator } from '~/components/ui/separator'

type Props = {
  question: Question
  options: QuestionOption[]
  timer: number | undefined
  onAnswer: (id: string) => unknown
}

export const AnswerQuestion = ({
  question,
  timer = 0,
  options,
  onAnswer
}: Props) => {
  const initialTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (initialTimeRef.current === null && timer > 0) {
      initialTimeRef.current = timer
    }
  }, [timer])

  const initialTime = initialTimeRef.current || 1
  const progressValue = (timer / initialTime) * 100

  return (
    timer > 0 && (
      <div className="flex w-full flex-col items-center justify-start p-4">
        <Progress value={progressValue} />

        <Separator className="my-2" />

        <div className="flex w-full items-center justify-start gap-2">
          <Badge className="flex w-full max-w-14 items-center justify-center p-2 text-lg">
            {timer}
          </Badge>

          <h2 className="text-start font-bold text-primary text-xl tracking-wide">
            {question.title}
          </h2>
        </div>

        <Separator className="my-2" />

        <div className="mt-4 flex w-full flex-col gap-3">
          {options.map(e => (
            <AnswerOption onClick={() => onAnswer(e.id)} key={e.id} data={e} />
          ))}
        </div>
      </div>
    )
  )
}

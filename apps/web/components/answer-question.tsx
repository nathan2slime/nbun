import { Question, QuestionOption } from '@nbun/database'
import { AnswerOption } from '~/components/answer-option'

type Props = {
  question: Question
  options: QuestionOption[]
  timer: number
  onAnswer: (id: string) => unknown
}

export const AnswerQuestion = ({
  question,
  timer,
  options,
  onAnswer
}: Props) => {
  return (
    <div className="flex w-full flex-col items-center justify-start p-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-primary font-bold text-primary-foreground">
        {timer}
      </div>

      <h2 className="mt-3 font-medium text-2xl text-primary">
        {question.title}
      </h2>

      <div className="mt-4 flex w-full flex-col gap-1">
        {options.map(e => (
          <AnswerOption onClick={() => onAnswer(e.id)} key={e.id} data={e} />
        ))}
      </div>
    </div>
  )
}

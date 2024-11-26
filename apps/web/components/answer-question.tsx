import { Question, QuestionOption } from '@nbun/database'
import { AnswerOption } from '~/components/answer-option'

type Props = {
  question: Question
  options: QuestionOption[]
  timer: number
}

export const AnswerQuestion = ({ question, timer, options }: Props) => {
  return (
    <div className="flex w-full flex-col items-center justify-start p-4">
      <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full border font-bold">
        {timer}
      </div>

      <h2 className="text-primary mt-3 text-2xl font-medium">
        {question.title}
      </h2>

      <div className="mt-4 flex w-full flex-col gap-1">
        {options.map(e => (
          <AnswerOption key={e.id} data={e} />
        ))}
      </div>
    </div>
  )
}

import { Question } from '@nbun/database'

type Props = {
  question: Question
  timer: number
}

export const AnswerQuestion = ({ question, timer }: Props) => {
  return (
    <div>
      <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full border">
        {timer}
      </div>
      {question.title}
    </div>
  )
}

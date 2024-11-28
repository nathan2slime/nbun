import { QuestionOption } from '@nbun/database'
import { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  data: QuestionOption
}

export const AnswerOption = ({ data, ...props }: Props) => {
  return (
    <div
      {...props}
      className="flex w-full justify-center gap-2 rounded-lg bg-accent p-4 text-accent-foreground"
    >
      {data.title}
    </div>
  )
}

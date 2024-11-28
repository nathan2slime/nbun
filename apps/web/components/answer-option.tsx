import { QuestionOption } from '@nbun/database'
import { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  data: QuestionOption
}

export const AnswerOption = ({ data, ...props }: Props) => {
  return (
    <div
      {...props}
      className="flex w-full items-start justify-start gap-2 rounded-lg bg-accent p-4 text-start text-accent-foreground uppercase"
    >
      {data.title}
    </div>
  )
}

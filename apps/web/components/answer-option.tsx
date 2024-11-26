import { QuestionOption } from '@nbun/database'

type Props = {
  data: QuestionOption
}

export const AnswerOption = ({ data }: Props) => {
  return (
    <div className="flex w-full justify-center gap-2 rounded-lg bg-accent p-4 text-accent-foreground">
      {data.title}
    </div>
  )
}

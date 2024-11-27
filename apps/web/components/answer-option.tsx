import { QuestionOption } from '@nbun/database'

type Props = {
  data: QuestionOption
}

export const AnswerOption = ({ data }: Props) => {
  return (
    <div className="flex w-full justify-center gap-2 rounded-md bg-accent p-3 text-accent-foreground">
      {data.title}
    </div>
  )
}

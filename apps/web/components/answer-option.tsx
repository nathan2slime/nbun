import { QuestionOption } from '@nbun/database'

type Props = {
  data: QuestionOption
}

export const AnswerOption = ({ data }: Props) => {
  return (
    <div className="bg-accent text-accent-foreground flex w-full justify-center gap-2 rounded-lg p-4">
      {data.title}
    </div>
  )
}

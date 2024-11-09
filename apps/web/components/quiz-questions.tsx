import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { updateQuestionMutate } from '~/api/mutations/quiz/question/update-question.mutation'
import { Input } from '~/components/ui/input'
import { QuestionQuizResponse } from '~/types/quiz.types'

type Props = {
  data: QuestionQuizResponse
  onUpdate: () => void
}

export const Question = ({ data, onUpdate }: Props) => {
  const mutation = useMutation({
    mutationKey: ['put-question'],
    mutationFn: updateQuestionMutate
  })

  const [question, setQuestion] = useState<QuestionQuizResponse>(data)

  const putQuestion = () => {
    const payload = {
      id: question.id,
      title: question.title,
      difficulty: question.difficulty
    }

    console.log(payload)

    mutation.mutate(payload, {
      onSuccess(data) {
        onUpdate()
      }
    })
  }

  return (
    <div className="rounded-md border p-2">
      <Input
        onBlur={putQuestion}
        value={question.title}
        onChange={e => setQuestion({ ...question, title: e.target.value })}
      />
    </div>
  )
}

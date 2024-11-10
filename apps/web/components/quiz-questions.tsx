import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { updateQuestionMutate } from '~/api/mutations/quiz/question/update-question.mutation'
import { Input } from '~/components/ui/input'
import { Difficulty, QuestionQuizResponse } from '~/types/quiz.types'
import { CreateOption } from '~/components/create-option'
import { DeleteQuestion } from '~/components/delete-question'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'
import { DIFFICULTIES } from '~/constants'

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
    if (question === data) {
      return
    }

    const payload = {
      id: question.id,
      title: question.title,
      difficulty: question.difficulty
    }

    mutation.mutate(payload, {
      onSuccess(data) {
        onUpdate()
      }
    })
  }

  return (
    <div className="bg-card flex flex-col gap-2 rounded-md border p-2">
      <div className="flex gap-2">
        <Input
          onBlur={putQuestion}
          value={question.title}
          onChange={e => setQuestion({ ...question, title: e.target.value })}
        />

        <DeleteQuestion optionId={question.id} onUpdate={onUpdate} />
      </div>

      <div className="flex w-full gap-2">
        <CreateOption questionId={question.id} />

        <Select
          value={question.difficulty}
          onValueChange={value =>
            setQuestion({ ...question, difficulty: value as Difficulty })
          }
        >
          <SelectTrigger
            onChange={putQuestion}
            className="bg-background w-full"
          >
            <SelectValue placeholder="Dificuldade" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Dificuldades</SelectLabel>
              {DIFFICULTIES.map(diff => (
                <SelectItem key={diff.value} value={diff.value}>
                  {diff.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

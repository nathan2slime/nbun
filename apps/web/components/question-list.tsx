import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
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
import { Option } from '~/components/question-option'
import { getOptionsQuery } from '~/api/queries/get-options.query'

type Props = {
  data: QuestionQuizResponse
  onUpdate: () => void
}

export const Question = ({ data, onUpdate }: Props) => {
  const [question, setQuestion] = useState<QuestionQuizResponse>(data)

  const { data: options, refetch } = useQuery({
    queryKey: ['get-options', data.id],
    queryFn: ({ queryKey: [_, questionId] }) => getOptionsQuery(questionId!)
  })

  const mutation = useMutation({
    mutationKey: ['put-question'],
    mutationFn: updateQuestionMutate
  })

  const putQuestion = () => {
    const payload = {
      id: question.id,
      title: question.title,
      difficulty: question.difficulty
    }

    mutation.mutate(payload, {
      onSuccess() {
        onUpdate()
      }
    })
  }

  useEffect(() => {
    putQuestion()
  }, [question.difficulty])

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
        <CreateOption onUpdate={refetch} questionId={question.id} />

        <Select
          value={question.difficulty}
          onValueChange={value =>
            setQuestion({ ...question, difficulty: value as Difficulty })
          }
        >
          <SelectTrigger className="bg-background w-full">
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

      <p className="text-xs">Opções:</p>

      {options?.map(option => <Option onUpdate={refetch} data={option} />)}

      {options?.length === 0 && <p>Nenhuma opção criada</p>}
    </div>
  )
}

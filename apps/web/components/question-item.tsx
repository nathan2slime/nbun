import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'

import {
  UpdateQuestion,
  updateQuestionMutate
} from '~/api/mutations/quiz/question/update-question.mutation'
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
import { EditQuizContext } from '~/components/edit-quiz'
import { getOptionsQuery } from '~/api/queries/get-options.query'
import { QuestionOption } from '~/components/question-option'

type Props = {
  question: QuestionQuizResponse
  position: number
}

export const QuestionItem = ({ question, position }: Props) => {
  const { quizId } = useContext(EditQuizContext)
  const queryClient = useQueryClient()

  const editQuestionMutation = useMutation({
    mutationKey: ['put-question'],
    mutationFn: ({
      quizId,
      payload
    }: {
      quizId: string
      payload: UpdateQuestion
    }) => updateQuestionMutate(quizId, payload)
  })

  const getOptions = useQuery({
    queryKey: ['get-options', question.id],
    queryFn: ({ queryKey: [_, questionId] }) =>
      getOptionsQuery({
        questionId: questionId!,
        quizId
      })
  })

  const form = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: question.title,
      id: question.id,
      difficulty: Difficulty.EASY
    }
  })

  const formValues = form.watch()

  const questionOptions = getOptions.data

  const onUpdateQuestion = (payload: UpdateQuestion) => {
    queryClient.setQueryData(
      ['get-questions', quizId],
      (questions: QuestionQuizResponse[]) =>
        (questions || []).map(e => (e.id == question.id ? payload : e))
    )
  }

  const onEditQuestion = async () => {
    const payload = form.getValues()

    onUpdateQuestion(payload)

    editQuestionMutation.mutate(
      { payload, quizId },
      {
        onSuccess(data) {
          onUpdateQuestion(data)
        }
      }
    )
  }

  const onEditDifficulty = (value: string) => {
    form.setValue('difficulty', value as Difficulty, { shouldValidate: true })

    onEditQuestion()
  }

  return (
    <div className="bg-accent/60 flex flex-col gap-2 rounded-md border p-2">
      <div className="flex w-full justify-between gap-2">
        <div className="flex w-full items-center gap-2">
          <span className="text-primary text-lg font-bold">{position + 1}</span>
          <Input
            onBlur={onEditQuestion}
            onChange={e =>
              form.setValue('title', e.target.value, { shouldValidate: true })
            }
            value={formValues.title}
          />
        </div>

        <DeleteQuestion questionId={question.id} />
      </div>

      <div className="flex w-full gap-2">
        <CreateOption questionId={question.id} />

        <Select
          value={question.difficulty}
          onValueChange={value => onEditDifficulty(value)}
        >
          <SelectTrigger
            onChange={onEditQuestion}
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

      {questionOptions &&
        questionOptions.map(option => (
          <QuestionOption
            key={option.id}
            questionId={question.id}
            data={option}
          />
        ))}
    </div>
  )
}

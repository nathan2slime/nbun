import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'

import { updateOptionMutation } from '~/api/mutations/quiz/question/option/update-option.mutation'
import { DeleteOption } from '~/components/delete-question-option'
import { EditQuizContext } from '~/components/edit-quiz'
import { Input } from '~/components/ui/input'
import { OptionResponse, UpdateOptionPayload } from '~/types/quiz.types'
import { Checkbox } from './ui/checkbox'

type Props = {
  data: OptionResponse
  questionId: string
  isCorrect: boolean
  setCorrectFn: Dispatch<SetStateAction<string | undefined>>
}

export const QuestionOption = ({
  data,
  questionId,
  isCorrect,
  setCorrectFn
}: Props) => {
  const [option, setOption] = useState(data)
  const { quizId } = useContext(EditQuizContext)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['update-option'],
    mutationFn: updateOptionMutation
  })

  const updateEditOptions = (payload: UpdateOptionPayload) =>
    queryClient.setQueryData(
      ['get-options', questionId],
      (prev: OptionResponse[]) =>
        (prev || []).map(e => (e.id === payload.id ? payload : e))
    )

  const updateOption = () => {
    const payload = {
      title: option.title,
      id: option.id,
      correct: isCorrect
    }

    updateEditOptions(payload)
    mutation.mutate({ payload: payload, question: questionId, quiz: quizId })
  }

  useEffect(() => {
    updateOption()
  }, [isCorrect])

  return (
    <div className="flex items-center justify-center gap-2">
      <Checkbox
        checked={isCorrect}
        onCheckedChange={() => {
          setCorrectFn(option.id)
        }}
      />
      <Input
        onBlur={() => updateOption()}
        value={option.title}
        onChange={e => setOption({ ...option, title: e.target.value })}
      />
      <DeleteOption optionId={option.id} questionId={questionId} />
    </div>
  )
}

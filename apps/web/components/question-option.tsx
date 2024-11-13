import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'

import { updateOptionMutation } from '~/api/mutations/quiz/question/option/update-option.mutation'
import { Input } from '~/components/ui/input'
import { OptionResponse, UpdateOptionPayload } from '~/types/quiz.types'
import { DeleteOption } from '~/components/delete-question-option'
import { EditQuizContext } from '~/components/edit-quiz'

type Props = {
  data: OptionResponse
  questionId: string
}

export const QuestionOption = ({ data, questionId }: Props) => {
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
        (prev || []).map(e => (e.id == payload.id ? payload : e))
    )

  const updateOption = () => {
    const payload = {
      title: option.title,
      id: option.id
    }

    updateEditOptions(payload)

    mutation.mutate({ payload: payload, question: questionId, quiz: quizId })
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Input
        onBlur={updateOption}
        value={option.title}
        onChange={e => setOption({ ...option, title: e.target.value })}
      />
      <DeleteOption optionId={option.id} questionId={questionId} />
    </div>
  )
}

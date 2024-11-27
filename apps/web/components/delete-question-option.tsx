import { useMutation, useQueryClient } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { useContext } from 'react'

import { deleteOptionMutation } from '~/api/mutations/quiz/question/option/delete-option.mutation'
import { EditQuizContext } from '~/components/edit-quiz'
import { Button } from '~/components/ui/button'
import { OptionResponse } from '~/types/quiz.types'

type Props = {
  optionId: string
  questionId: string
}

export const DeleteOption = ({ optionId, questionId }: Props) => {
  const queryClient = useQueryClient()
  const { quizId } = useContext(EditQuizContext)

  const mutation = useMutation({
    mutationKey: ['delete-option'],
    mutationFn: deleteOptionMutation
  })

  const updateRemoveOption = () =>
    queryClient.setQueryData(
      ['get-options', questionId],
      (prev: OptionResponse[]) => (prev || []).filter(e => e.id !== optionId)
    )

  const deleteOption = () => {
    updateRemoveOption()

    mutation.mutate({ id: optionId, quizId, questionId })
  }

  return (
    <Button variant="destructive" onClick={deleteOption}>
      <X size={22} strokeWidth={1.6} />
    </Button>
  )
}

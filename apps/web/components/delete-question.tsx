import { useMutation } from '@tanstack/react-query'
import { Trash } from 'lucide-react'

import { deleteQuestionMutation } from '~/api/mutations/quiz/question/delete-question.mutation'
import { Button } from '~/components/ui/button'

type Props = {
  questionId: string
  onUpdate: () => void
  quizId: string
}

export const DeleteQuestion = ({ questionId, onUpdate, quizId }: Props) => {
  const mutation = useMutation({
    mutationKey: ['delete-option'],
    mutationFn: deleteQuestionMutation
  })

  const deleteQuestion = () => {
    mutation.mutate(
      { questionId, quizId },
      {
        onSuccess() {
          onUpdate()
        }
      }
    )
  }

  return (
    <Button onClick={deleteQuestion} className="bg-destructive">
      <Trash />
    </Button>
  )
}

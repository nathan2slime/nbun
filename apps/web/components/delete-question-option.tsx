import { useMutation } from '@tanstack/react-query'
import { CircleX } from 'lucide-react'
import { deleteOptionMutation } from '~/api/mutations/quiz/question/option/delete-option.mutation'
import { Button } from '~/components/ui/button'

type Props = {
  optionId: string
  onUpdate: () => void
  quizId: string
  questionId: string
}

export const DeleteOption = ({
  optionId,
  onUpdate,
  questionId,
  quizId
}: Props) => {
  const mutation = useMutation({
    mutationKey: ['delete-option'],
    mutationFn: deleteOptionMutation
  })

  const deleteOption = () => {
    mutation.mutate(
      { id: optionId, quizId, questionId },
      {
        onSuccess() {
          onUpdate()
        }
      }
    )
  }

  return (
    <Button variant="destructive" onClick={deleteOption}>
      <CircleX size={35} />
    </Button>
  )
}

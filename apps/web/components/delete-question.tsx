import { useMutation } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { deleteQuestionMutation } from '~/api/mutations/quiz/question/delete-question.mutation'
import { Button } from '~/components/ui/button'

type Props = {
  optionId: string
  onUpdate: () => void
}

export const DeleteQuestion = ({ optionId, onUpdate }: Props) => {
  const mutation = useMutation({
    mutationKey: ['delete-option'],
    mutationFn: deleteQuestionMutation
  })

  const deleteQuestion = () => {
    mutation.mutate(optionId, {
      onSuccess() {
        onUpdate()
      }
    })
  }

  return (
    <Button onClick={deleteQuestion} className="bg-destructive">
      <Trash />
    </Button>
  )
}

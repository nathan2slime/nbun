import { useMutation } from '@tanstack/react-query'
import { CircleX } from 'lucide-react'
import { deleteOptionMutation } from '~/api/mutations/quiz/question/option/delete-option.mutation'
import { Button } from '~/components/ui/button'

type Props = {
  optionId: string
  onUpdate: () => void
}

export const DeleteOption = ({ optionId, onUpdate }: Props) => {
  const mutation = useMutation({
    mutationKey: ['delete-option'],
    mutationFn: deleteOptionMutation
  })

  const delteOption = () => {
    mutation.mutate(optionId, {
      onSuccess() {
        onUpdate()
      }
    })
  }

  return (
    <Button variant="destructive" onClick={delteOption}>
      <CircleX size={35} />
    </Button>
  )
}

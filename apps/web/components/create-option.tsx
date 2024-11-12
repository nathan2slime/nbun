import { useMutation } from '@tanstack/react-query'
import { SquarePlus } from 'lucide-react'
import toast from 'react-hot-toast'
import { createOptionMutation } from '~/api/mutations/quiz/question/option/create-option.mutation'
import { Button } from '~/components/ui/button'

type Props = {
  questionId: string
}

export const CreateOption = ({ questionId }: Props) => {
  const mutation = useMutation({
    mutationKey: ['create-option'],
    mutationFn: createOptionMutation
  })

  const createOption = () => {
    const payload = {
      title: 'Nova opção',
      questionId
    }

    mutation.mutate(payload, {
      onSuccess(data) {
        toast.success('Nova opção criada!')
      }
    })
  }

  return (
    <Button onClick={createOption} className="w-full">
      <SquarePlus />
      Opção
    </Button>
  )
}

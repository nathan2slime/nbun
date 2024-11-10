import { useMutation } from '@tanstack/react-query'
import { SquarePlus } from 'lucide-react'
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
      title: 'Questão sem titulo',
      questionId: questionId
    }

    mutation.mutate(payload, {
      onSuccess(data) {}
    })
  }

  return (
    <Button onClick={createOption} className="w-full">
      <SquarePlus />
      Opção
    </Button>
  )
}

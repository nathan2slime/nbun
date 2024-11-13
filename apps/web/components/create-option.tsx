import { useMutation } from '@tanstack/react-query'
import { SquarePlus } from 'lucide-react'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { createOptionMutation } from '~/api/mutations/quiz/question/option/create-option.mutation'
import { EditQuizContext } from '~/components/edit-quiz'
import { Button } from '~/components/ui/button'

type Props = {
  questionId: string
  onUpdate: () => void
  quizId: string
}

export const CreateOption = ({ questionId }: Props) => {
  const { quizId } = useContext(EditQuizContext)

  const mutation = useMutation({
    mutationKey: ['create-option'],
    mutationFn: createOptionMutation
  })

  const createOption = () => {
    const payload = {
      title: 'Nova opção',
      questionId,
      quizId: quizId!
    }

    mutation.mutate(payload, {
      onSuccess() {
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

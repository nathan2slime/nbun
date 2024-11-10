'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { createQuizMutation } from '~/api/mutations/quiz/create-quiz.mutation'
import { Button } from '~/components/ui/button'

export const CreateQuiz = () => {
  const mutation = useMutation({
    mutationKey: ['create-quiz'],
    mutationFn: createQuizMutation
  })

  const router = useRouter()

  const createQuiz = () => {
    mutation.mutate(
      {
        title: 'Quiz sem título'
      },
      {
        onSuccess(data) {
          toast.success('Quiz criado com sucesso!')
          router.push('/edit-quiz/' + data.id)
        }
      }
    )
  }

  return <Button onClick={createQuiz}>Criar novo Quiz</Button>
}

'use client'

import { useMutation } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
        title: 'Novo quiz'
      },
      {
        onSuccess(data) {
          router.push(`/quizzes/edit/${data.id}`)
        }
      }
    )
  }

  return (
    <Button variant="default" size="icon" onClick={createQuiz}>
      <Plus strokeWidth={1.5} className="text-primary-foreground" width={22} />
    </Button>
  )
}

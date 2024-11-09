'use client'

import { Quiz } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

import { updateQuizMutation } from '~/api/mutations/quiz/update-quiz.mutation'
import { DialogCreateQuestion } from '~/components/dialog-create-question'
import { Input } from '~/components/ui/input'
import { UpdateQuizPayload } from '~/types/quiz.types'

type Props = {
  data: Quiz
}

export const EditQuiz = ({ data }: Props) => {
  const [quiz, setQuiz] = useState(data)

  const mutation = useMutation({
    mutationKey: ['update-quiz'],
    mutationFn: updateQuizMutation
  })

  const updateQuiz = () => {
    const payload: UpdateQuizPayload = {
      id: quiz.id,
      title: quiz.title
    }

    mutation.mutate(payload, {
      onSuccess(data) {
        console.log('Titulo alterado!')
      }
    })
  }
  return (
    <div className="flex flex-col gap-2">
      <Input
        className="text-xl"
        onBlur={updateQuiz}
        value={quiz.title}
        onChange={e => setQuiz({ ...quiz, title: e.target.value })}
      />

      <DialogCreateQuestion />
    </div>
  )
}

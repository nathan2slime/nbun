'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getQuizQuery } from '~/api/queries/get-quiz.query'
import { Input } from '~/components/ui/input'
import { QuizPayload, QuizResponse } from '~/types/quiz.types'
import { useMutation } from '@tanstack/react-query'
import { updateQuizMutation } from '~/api/mutations/quiz/update-quiz.mutation'
import DialogCreateQuestion from '~/components/dialog-create-question'

const EditQuiz = () => {
  const params = useParams()
  const id = params.id

  const [quiz, setQuiz] = useState<QuizResponse>()

  const mutation = useMutation({
    mutationKey: ['update-quiz'],
    mutationFn: updateQuizMutation
  })

  const getQuiz = async () => {
    if (typeof id === 'string') {
      setQuiz(await getQuizQuery(id))
      setTitle(quiz.title)
    }
  }

  const updateQuiz = () => {
    const payload: QuizPayload = {
      id: quiz.id,
      title: quiz.title
    }

    mutation.mutate(payload, {
      onSuccess(data) {
        console.log('Titulo alterado!')
      }
    })
  }

  useEffect(() => {
    getQuiz()
  }, [])

  return (
    <div className={'h-screen w-screen p-2'}>
      <div className={'flex flex-col gap-2'}>
        <Input
          className={'text-xl'}
          onBlur={updateQuiz}
          value={quiz?.title}
          onChange={e => setQuiz({ ...quiz, title: e.target.value })}
        />
        <DialogCreateQuestion />
      </div>
    </div>
  )
}

export default EditQuiz

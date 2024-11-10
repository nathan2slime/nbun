'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { updateQuizMutation } from '~/api/mutations/quiz/update-quiz.mutation'
import { getQuestionQuery } from '~/api/queries/get-questions.query'
import { DialogCreateQuestion } from '~/components/dialog-create-question'
import { Question } from '~/components/quiz-questions'
import { Input } from '~/components/ui/input'
import { QuizResponse, UpdateQuizPayload } from '~/types/quiz.types'

type Props = {
  data: QuizResponse
}

export const EditQuiz = ({ data }: Props) => {
  const [quiz, setQuiz] = useState(data)

  const { data: questions, refetch } = useQuery({
    queryKey: ['get-questions', data.id],
    queryFn: ({ queryKey: [_, quizId] }) => getQuestionQuery(quizId!)
  })

  const mutation = useMutation({
    mutationKey: ['update-quiz'],
    mutationFn: updateQuizMutation
  })

  const updateQuiz = () => {
    const payload: UpdateQuizPayload = {
      id: quiz.id,
      title: quiz.title
    }

    mutation.mutate(payload)
  }

  return (
    <div className="flex flex-col gap-2">
      <Input
        className="text-xl"
        onBlur={updateQuiz}
        value={quiz.title}
        onChange={e => setQuiz({ ...quiz, title: e.target.value })}
      />

      <DialogCreateQuestion onCreated={refetch} questionId={quiz.id} />

      {questions?.map(question => (
        <Question key={question.id} onUpdate={refetch} data={question} />
      ))}
    </div>
  )
}

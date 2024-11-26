'use client'

import { useState } from 'react'

import { CardQuiz } from '~/components/card-quiz'
import { DeleteQuiz } from '~/components/delete-quiz'
import { Quiz } from '~/types/quiz.types'

type Props = {
  data: Quiz[]
}

export const FeedQuiz = ({ data = [] }: Props) => {
  const [quizzes, setQuizzes] = useState(data || [])

  return (
    <div className="flex flex-col gap-1">
      <DeleteQuiz
        onDelete={id => setQuizzes(prev => prev.filter(e => e.id !== id))}
      />

      {quizzes.map(quiz => {
        return <CardQuiz data={quiz} key={quiz.id} />
      })}
    </div>
  )
}

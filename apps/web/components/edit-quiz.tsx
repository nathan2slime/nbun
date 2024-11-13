'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext, useState } from 'react'

import { updateQuizMutation } from '~/api/mutations/quiz/update-quiz.mutation'
import { getQuestionQuery } from '~/api/queries/get-questions.query'
import { CreateQuestion } from '~/components/create-question'
import { QuestionItem } from '~/components/question-item'
import { Input } from '~/components/ui/input'
import { QuizResponse, UpdateQuizPayload } from '~/types/quiz.types'

type Props = {
  quiz: QuizResponse
}

type ContextType = {
  quizId: string
}

export const EditQuizContext = createContext<ContextType>({
  quizId: ''
})

export const EditQuiz = (props: Props) => {
  const [quiz, setQuiz] = useState(props.quiz)
  const clientQuery = useQueryClient()

  const getQuestionsQuery = useQuery({
    queryKey: ['get-questions', quiz.id],
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

  const questions = getQuestionsQuery.data

  return (
    <EditQuizContext.Provider value={{ quizId: quiz.id }}>
      <div className="flex flex-col gap-2">
        <Input
          className="p-3 text-xl font-semibold"
          onBlur={updateQuiz}
          value={quiz.title || ''}
          onChange={e => setQuiz({ ...quiz, title: e.target.value })}
        />

        <CreateQuestion
          onCreated={question =>
            clientQuery.setQueryData(
              ['get-questions', quiz.id],
              [...(questions || []), question]
            )
          }
          questionId={quiz.id}
        />

        {questions &&
          questions.map(question => (
            <QuestionItem key={question.id} question={question} />
          ))}
      </div>
    </EditQuizContext.Provider>
  )
}

'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext, useState } from 'react'

import { updateQuizMutation } from '~/api/mutations/quiz/update-quiz.mutation'
import { getQuestionQueryClient } from '~/api/queries/get-questions-client.query'
import { CreateQuestion } from '~/components/create-question'
import { QuestionItem } from '~/components/question-item'
import { Input } from '~/components/ui/input'
import { Quiz, UpdateQuizPayload } from '~/types/quiz.types'

type Props = {
  quiz: Quiz
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
    queryFn: ({ queryKey: [_, quizId] }) => getQuestionQueryClient(quizId!)
  })

  const mutation = useMutation({
    mutationKey: ['update-quiz', quiz.id],
    mutationFn: async ({
      quizId,
      variables
    }: {
      quizId: string
      variables: UpdateQuizPayload
    }) => updateQuizMutation(variables, quizId)
  })

  const updateQuiz = () => {
    const variables: UpdateQuizPayload = {
      title: quiz.title
    }

    mutation.mutateAsync({
      quizId: quiz.id,
      variables
    })
  }

  const questions = getQuestionsQuery.data

  return (
    <EditQuizContext.Provider value={{ quizId: quiz.id }}>
      <div className="flex flex-col gap-2">
        <Input
          className="bg-secondary h-12 px-3 py-4 text-lg font-semibold"
          onBlur={updateQuiz}
          placeholder="Assunto"
          value={quiz.title || ''}
          onChange={e => setQuiz({ ...quiz, title: e.target.value })}
        />

        <div className="mt-3 flex items-center justify-between rounded-lg p-2">
          <h1 className="text-base font-medium tracking-wide">Questões</h1>

          <CreateQuestion
            onCreated={question =>
              clientQuery.setQueryData(
                ['get-questions', quiz.id],
                [...(questions || []), question]
              )
            }
          />
        </div>

        {questions &&
          questions.map((question, idx) => (
            <QuestionItem
              position={idx}
              key={question.id}
              question={question}
            />
          ))}
      </div>
    </EditQuizContext.Provider>
  )
}

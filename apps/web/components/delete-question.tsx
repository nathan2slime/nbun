import { useMutation } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

import { deleteQuestionMutation } from '~/api/mutations/quiz/question/delete-question.mutation'
import { Button } from '~/components/ui/button'
import { QuestionQuizResponse } from '~/types/quiz.types'

type Props = {
  question: QuestionQuizResponse
  onUpdate: () => void
  quizId: string
}

export const DeleteQuestion = ({ question, onUpdate, quizId }: Props) => {
  const mutation = useMutation({
    mutationKey: ['delete-option'],
    mutationFn: deleteQuestionMutation
  })

  const deleteQuestion = () => {
    mutation.mutate(
      { questionId: question.id, quizId },
      {
        onSuccess() {
          onUpdate()
        }
      }
    )
  }

  return (
    <Button onClick={deleteQuestion} variant="destructive">
      <Trash />
    </Button>
  )
}

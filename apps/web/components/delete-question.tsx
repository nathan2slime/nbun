import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { Dispatch, SetStateAction, useContext } from 'react'

import { deleteQuestionMutation } from '~/api/mutations/quiz/question/delete-question.mutation'
import { EditQuizContext } from '~/components/edit-quiz'
import { Button } from '~/components/ui/button'
import { QuestionQuizResponse } from '~/types/quiz.types'

type Props = {
  questionId: string
}

export const DeleteQuestion = ({ questionId }: Props) => {
  const mutation = useMutation({
    mutationKey: ['delete-option'],
    mutationFn: deleteQuestionMutation
  })

  const { quizId } = useContext(EditQuizContext)

  const queryClient = useQueryClient()

  const onUpdateQuestions = () => {
    queryClient.setQueryData(
      ['get-questions', quizId],
      (questions: QuestionQuizResponse[]) =>
        (questions || []).filter(e => e.id !== questionId)
    )
  }

  const deleteQuestion = () => {
    onUpdateQuestions()

    mutation.mutate(
      { questionId, quizId },
      {
        onSuccess() {
          onUpdateQuestions()
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

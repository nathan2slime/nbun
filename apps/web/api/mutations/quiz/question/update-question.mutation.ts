import { api } from '~/api/client'
import { QuestionQuizFormData } from '~/lib/schemas/quiz.schemas'
import { QuestionQuizResponse } from '~/types/quiz.types'

export type UpdateQuestion = QuestionQuizFormData & {
  id: string
}

export const updateQuestionMutate = async (
  quizId: string,
  payload: UpdateQuestion
) => {
  const { data } = await api.put<QuestionQuizResponse>(
    '/question/update',
    {
      title: payload.title,
      difficulty: payload.difficulty
    },
    {
      headers: {
        'quiz-id': quizId,
        'question-id': payload.id
      }
    }
  )

  return data
}

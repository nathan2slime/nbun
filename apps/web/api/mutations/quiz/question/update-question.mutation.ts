import { api } from '~/api/client'
import { QuestionQuizFormData, QuestionQuizResponse } from '~/types/quiz.types'

export type UpdateQuestion = QuestionQuizFormData & {
  id: string
}

export const updateQuestionMutate = async (payload: UpdateQuestion) => {
  const { data } = await api.put<QuestionQuizResponse>(
    '/question/update/' + payload.id,
    {
      title: payload.title,
      difficulty: payload.difficulty
    }
  )

  return data
}

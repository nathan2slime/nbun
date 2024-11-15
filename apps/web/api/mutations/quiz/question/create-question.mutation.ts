import { api } from '~/api/client'
import { QuestionQuizPayload, QuestionQuizResponse } from '~/types/quiz.types'

export const createQuestionMutation = async (
  quizId: string,
  payload: QuestionQuizPayload
) => {
  const { data } = await api.post<QuestionQuizResponse>(
    '/question/create',
    payload,
    {
      headers: {
        ['quiz-id']: quizId
      }
    }
  )

  return data
}

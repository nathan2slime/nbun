import { api } from '~/api/client'
import { UpdateQuizPayload, Quiz } from '~/types/quiz.types'

export const updateQuizMutation = async (
  payload: UpdateQuizPayload,
  quizId: string
) => {
  const { data } = await api.put<Quiz>(
    '/quiz/update',
    {
      title: payload.title
    },
    {
      headers: {
        ['quiz-id']: quizId
      }
    }
  )

  return data
}

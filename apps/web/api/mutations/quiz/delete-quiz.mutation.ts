import { api } from '~/api/client'

export const deleteQuizMutation = async (quizId: string) => {
  const { status } = await api.delete('/quiz/delete', {
    headers: {
      'quiz-id': quizId
    }
  })

  return status === 200
}

import { api } from '~/api/client'

type Args = {
  questionId: string
  quizId: string
}

export const deleteQuestionMutation = async ({ quizId, questionId }: Args) => {
  const { data } = await api.delete('/question/delete', {
    headers: {
      ['quiz-id']: quizId,
      ['question-id']: questionId
    }
  })

  return data
}

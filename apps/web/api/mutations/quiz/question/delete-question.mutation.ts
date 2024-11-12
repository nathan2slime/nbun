import { api } from '~/api/client'

type Args = {
  questionId: string
  quizId: string
}

export const deleteQuestionMutation = async ({ quizId, questionId }: Args) => {
  const { data } = await api.delete('/question/delete/' + questionId, {
    headers: {
      quiz: quizId
    }
  })

  return data
}

import { api } from '~/api/client'

type DeleteOptionMutation = {
  id: string
  questionId: string
  quizId: string
}

export const deleteOptionMutation = async ({
  id,
  quizId,
  questionId
}: DeleteOptionMutation) => {
  const { data } = await api.delete('/question/option/delete/' + id, {
    headers: {
      quiz: quizId,
      question: questionId
    }
  })

  return data
}

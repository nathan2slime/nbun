import { api } from '~/api/client'
import { QuestionQuizResponse } from '~/types/quiz.types'

export const getQuestionQuery = async (id: string) => {
  const { data } = await api.get<QuestionQuizResponse[]>(
    '/question/paginate?quizId=' + id
  )

  return data
}

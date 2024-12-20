import { api } from '~/api/client'
import { QuestionQuizResponse } from '~/types/quiz.types'

export const getQuestionQueryClient = async (quizId: string) => {
  const { data } = await api.get<QuestionQuizResponse[]>('/question/paginate', {
    params: {
      quizId
    }
  })

  return data
}

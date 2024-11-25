import { api } from '~/api/server'
import { QuestionQuizResponse } from '~/types/quiz.types'

export const getQuestionQueryServer = async (quizId: string) => {
  const { data } = await api.get<QuestionQuizResponse[]>('/question/paginate', {
    params: {
      quizId
    }
  })

  return data
}

import { Quiz } from '@nbun/database'
import { api } from '~/api/server'

export const getQuizQuery = async (quizId: string) => {
  const { data } = await api.get<Quiz>('/quiz/show/' + quizId)

  return data
}

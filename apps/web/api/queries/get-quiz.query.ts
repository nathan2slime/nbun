import { Quiz } from '@prisma/client'
import { api } from '~/api/server'

export const getQuizQuery = async (quizId: string) => {
  const { data } = await api.get<Quiz>('/quiz/show/' + quizId)

  return data
}

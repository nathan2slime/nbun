import { Quiz } from '@prisma/client'
import { api } from '~/api/server'

export const getQuizQuery = async (id: string) => {
  const { data } = await api.get<Quiz>('/quiz/show/' + id, {
    headers: {
      quiz: id
    }
  })

  return data
}

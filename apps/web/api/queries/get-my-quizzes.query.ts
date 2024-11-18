import { Quiz } from '@nbun/database'

import { api } from '~/api/server'

export const getMyQuizzesQuery = async () => {
  const { data } = await api.get<Quiz[]>('/quiz/my')

  return data
}

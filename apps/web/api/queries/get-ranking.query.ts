import { api } from '~/api/server'

type Response = { id: string; experience: number }[]

export const getRankingQuery = async () => {
  const { data } = await api.get<Response>('/user/ranking')

  return data
}

import { QueryClient } from '@tanstack/react-query'

import { getRankingQuery } from '~/api/queries/get-ranking.query'
import { QuizUser } from '~/components/quiz-user'

const Ranking = async () => {
  const client = new QueryClient()

  const ranking = await client.fetchQuery({
    queryFn: getRankingQuery,
    queryKey: ['ranking']
  })

  return (
    <div className="p-2">
      {ranking.map(e => (
        <QuizUser key={e.id} userId={e.id} points={e.experience} />
      ))}
    </div>
  )
}

export default Ranking

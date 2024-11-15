import { QueryClient } from '@tanstack/react-query'

import { getMyQuizzesQuery } from '~/api/queries/get-my-quizzes.query'
import { CardQuiz } from '~/components/card-quiz'
import { CreateQuiz } from '~/components/create-quiz'
import { DeleteQuiz } from '~/components/delete-quiz'
import { FeedQuiz } from '~/components/feed-quiz'
import { Separator } from '~/components/ui/separator'

const Quizzes = async () => {
  const client = new QueryClient()

  const myQuizzes = await client.fetchQuery({
    queryFn: getMyQuizzesQuery,
    queryKey: ['my-quizzes']
  })

  return (
    <div className="h-full w-full p-3">
      <div className="flex w-full items-end justify-between">
        <h1 className="text-lg font-semibold tracking-wide">Quizzes</h1>

        <CreateQuiz />
      </div>

      <Separator className="my-3" />

      <FeedQuiz data={myQuizzes} />
    </div>
  )
}

export default Quizzes

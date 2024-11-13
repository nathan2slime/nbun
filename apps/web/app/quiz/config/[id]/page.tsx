import { QueryClient } from '@tanstack/react-query'
import { NextPage } from 'next'

import { getQuizQuery } from '~/api/queries/get-quiz.query'
import { EditQuiz } from '~/components/edit-quiz'

type Props = {
  params: Promise<{
    id: string
  }>
}

const Page: NextPage<Props> = async ({ params }) => {
  const quizId = (await params).id
  const clientQuery = new QueryClient()

  const quiz = await clientQuery.fetchQuery({
    queryKey: ['get-quiz', quizId],
    queryFn: ({ queryKey: [_, quizId] }) => getQuizQuery(quizId!)
  })

  if (quiz) {
    return (
      <div className="min-h-screen w-full p-2 md:p-5">
        <EditQuiz quiz={quiz} />
      </div>
    )
  }
}

export default Page

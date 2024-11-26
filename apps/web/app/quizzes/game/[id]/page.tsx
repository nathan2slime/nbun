import { QueryClient } from '@tanstack/react-query'
import { NextPage } from 'next'

import { getQuizFormQuery } from '~/api/queries/get-quiz-form.query'
import { QuizView } from '~/components/quiz-view'

type Props = {
  params: Promise<{
    id: string
  }>
}

const Home: NextPage<Props> = async ({ params }) => {
  const quizId = (await params).id
  const clientQuery = new QueryClient()

  const quiz = await clientQuery.fetchQuery({
    queryKey: ['get-quiz', quizId],
    queryFn: ({ queryKey: [_, quizId] }) => getQuizFormQuery(quizId!)
  })

  return <QuizView questions={quiz.questions} quiz={quiz} />
}

export default Home

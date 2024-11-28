import { QueryClient } from '@tanstack/react-query'
import { NextPage } from 'next'

import { getQuizFormQuery } from '~/api/queries/get-quiz-form.query'
import { getQuizResponsesQuery } from '~/api/queries/get-quiz-responses.query'
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

  const responses = await clientQuery.fetchQuery({
    queryKey: ['get-responses', quizId],
    queryFn: ({ queryKey: [_, quizId] }) => getQuizResponsesQuery(quizId!)
  })

  const ranking = responses.map(e => ({
    pontuation: e.responses.reduce((acc, qr) => acc + qr.pontuation, 0),
    userId: e.userId
  }))

  return <QuizView questions={quiz.questions} ranking={ranking} quiz={quiz} />
}

export default Home

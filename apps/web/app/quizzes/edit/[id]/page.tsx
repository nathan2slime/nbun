import { QueryClient } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'
import { NextPage } from 'next'
import Link from 'next/link'

import { getQuizQuery } from '~/api/queries/get-quiz.query'
import { EditQuiz } from '~/components/edit-quiz'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'

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
      <div className="min-h-screen w-full p-3">
        <div className="flex w-full items-center justify-start gap-2">
          <Link href="/quizzes">
            <Button variant="secondary" size="icon">
              <ChevronLeft strokeWidth={1.6} />
            </Button>
          </Link>

          <h1 className="font-semibold text-lg tracking-wide">Editar</h1>
        </div>

        <Separator className="my-3" />

        <EditQuiz quiz={quiz} />
      </div>
    )
  }
}

export default Page

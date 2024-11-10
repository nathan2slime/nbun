import { NextPage } from 'next'

import { getQuizQuery } from '~/api/queries/get-quiz.query'
import { EditQuiz } from '~/components/edit-quiz'

type Props = {
  params: Promise<{
    id: string
  }>
}

const Page: NextPage<Props> = async ({ params }) => {
  const id = (await params).id

  const quiz = await getQuizQuery(id)

  if (quiz) {
    return (
      <div className="h-screen w-screen p-2">
        <EditQuiz data={quiz} />
      </div>
    )
  }
}

export default Page

'use client'

import { useSnapshot } from 'valtio'
import { CreateQuiz } from '~/components/create-quiz'
import { authState } from '~/store/auth.state'

const Home = () => {
  const { session } = useSnapshot(authState)

  return (
    <div className="flex h-screen w-screen flex-col items-start justify-start">
      <div className="bg-card border-b-border flex w-full items-center justify-between border-b p-3">
        <h1 className="text-foreground text-lg font-bold">Quizzes</h1>
        <CreateQuiz />
      </div>
    </div>
  )
}

export default Home

'use client'

import { useSnapshot } from 'valtio'

import { Avatar, AvatarImage } from '~/components/ui/avatar'

import { authState } from '~/store/auth.state'
import { Button } from '~/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { createQuizMutation } from '~/api/mutations/quiz/create-quiz.mutation'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const Home = () => {
  const { data } = useSnapshot(authState)

  const router = useRouter()

  const mutation = useMutation({
    mutationKey: ['create-quiz'],
    mutationFn: createQuizMutation
  })

  const createQuiz = () => {
    mutation.mutate(
      { title: 'Quiz sem título' },
      {
        onSuccess(data) {
          toast.success('Quiz criado com sucesso!')
          router.push('/edit-quiz/' + data.id)
        }
      }
    )
  }

  return (
    <div className="flex h-screen w-screen flex-col items-start justify-start p-2">
      <div className="flex w-full items-center justify-between">
        <div className={'flex items-center gap-2'}>
          <Avatar>
            <AvatarImage
              src={'/assets/'.concat(data!.user.avatar).concat('.jpg')}
            />
          </Avatar>

          {data!.user.username}
        </div>

        <Button onClick={createQuiz}>Criar novo Quiz</Button>
      </div>
    </div>
  )
}

export default Home

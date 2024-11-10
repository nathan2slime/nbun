'use client'

import { useSnapshot } from 'valtio'
import { CreateQuiz } from '~/components/create-quiz'
import { Avatar, AvatarImage } from '~/components/ui/avatar'
import { authState } from '~/store/auth.state'

const Home = () => {
  const { session } = useSnapshot(authState)

  return (
    <div className="flex h-screen w-screen flex-col items-start justify-start p-2">
      <div className="flex w-full items-center justify-between">
        <div className={'flex items-center gap-2'}>
          <Avatar>
            <AvatarImage
              src={'/assets/'.concat(session!.user.avatar).concat('.jpg')}
            />
          </Avatar>

          {session!.user.username}
        </div>

        <CreateQuiz />
      </div>
    </div>
  )
}

export default Home

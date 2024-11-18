'use client'

import { useSnapshot } from 'valtio'
import { UserAvatar } from '~/components/user-avatar'
import { UserXp } from '~/components/user-xp'

import { AuthState, authState } from '~/store/auth.state'

import { Session } from '~/types/auth.types'

const Home = () => {
  const { session } = useSnapshot(authState as AuthState<Session>)
  const user = session.user

  return (
    <div className="flex flex-col items-start justify-start">
      <div className="flex w-full justify-between p-3">
        <UserAvatar user={user} />

        <UserXp value={user.experience} />
      </div>
    </div>
  )
}

export default Home

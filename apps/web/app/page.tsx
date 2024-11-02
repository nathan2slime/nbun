'use client'

import { useSnapshot } from 'valtio'

import { authState } from '~/store/auth.state'

const Home = () => {
  const { data, logged } = useSnapshot(authState)

  return <div>{JSON.stringify(data)}</div>
}

export default Home

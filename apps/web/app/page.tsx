'use client'

import { useSnapshot } from 'valtio'

import { authState } from '~/store/auth.state'

const Home = () => {
  const { data, logged } = useSnapshot(authState)

  return <div></div>
}

export default Home

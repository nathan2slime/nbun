'use client'

import { NextPage } from 'next'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { socket } from '~/api/client'

type NewMember = {
  quizId: string

  memberId: string
}

type Props = {
  params: {
    id: string
  }
}

const Home: NextPage<Props> = () => {
  const params = useParams()
  const id = params.id
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState<string>('')

  const addNewMember = (data: string) => {
    setMessages(messages => [...messages, data])
  }

  useEffect(() => {
    socket.emit('members', { quizId: id })
    socket.on('members', addNewMember)
    socket.on('join:' + id, addNewMember)

    return () => {
      socket.off('join:' + id)
      socket.off('members')
    }
  }, [])

  const sendMessage = () => {
    if (input) {
      socket.emit('join', { quizId: id, memberId: input })
      setInput('')
    }
  }

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {id}:{msg}
          </li>
        ))}
      </ul>

      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Digite uma mensagem"
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  )
}

export default Home

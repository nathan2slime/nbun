'use client'

import { NextPage } from 'next'
import { SelectIcon } from '~/components/select-icon'
import { useState } from 'react'
import { Input } from '~/components/ui/input'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signingSchema } from '~/app/schemas/signing'
import { Button } from '~/components/ui/button'

const Signing: NextPage = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(1)

  const form = useForm({
    resolver: zodResolver(signingSchema)
  })
  const { register, handleSubmit, control } = form

  const avatars = [
    {
      id: 1,
      name: 'Onça',
      img: '/images/jaguar.png'
    },
    {
      id: 2,
      name: 'Coala',
      img: '/images/koala.png'
    },
    {
      id: 3,
      name: 'Arara',
      img: '/images/macaw.png'
    }
  ]

  const submitSigning = () => {}

  return (
    <div className="bg-background flex h-screen w-screen flex-col px-3 pt-5">
      <Form {...form}>
        <form
          className={'flex w-full flex-col gap-5'}
          onSubmit={handleSubmit(submitSigning)}
        >
          <p className={'text-primary text-3xl font-semibold'}>
            Crie seu perfil
          </p>

          <div className={'flex flex-col items-center gap-2'}>
            <div className={'flex gap-2'}>
              {avatars.map(avatar => (
                <SelectIcon
                  onClick={() => setSelectedAvatar(avatar.id)}
                  selected={selectedAvatar == avatar.id}
                  img={avatar.img}
                  name={avatar.name}
                />
              ))}
            </div>

            <p className={'text-primary-foreground'}>Escolha um Avatar</p>
          </div>

          <FormField
            control={control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="ex: João da Silva" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input {...field} type={'password'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button>Enviar</Button>
        </form>
      </Form>
    </div>
  )
}

export default Signing

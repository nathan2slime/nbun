'use client'

import { NextPage } from 'next'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import { AvatarButton } from '~/components/avatar-button'
import { Input } from '~/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form'
import { signUpSchema, SignUpSchema } from '~/lib/schemas/auth.schemas'
import { Button } from '~/components/ui/button'
import { avatars } from '~/lib/avatars'
import { AvatarsDialog } from '~/components/avatars-dialog'
import { signUpMutation } from '~/api/mutations/signup.mutation'
import { Props } from '~/components/loading'
import { authState } from '~/store/auth.state'

const SignUp: NextPage = () => {
  const mutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: signUpMutation
  })

  const router = useRouter()

  const Loading = dynamic<Props>(
    async () => (await import('~/components/loading')).Loading,
    { ssr: false }
  )

  const form = useForm<SignUpSchema>({
    mode: 'all',
    defaultValues: {
      avatar: 'woin'
    },
    resolver: zodResolver(signUpSchema)
  })

  const {
    setValue,
    handleSubmit,
    formState: { isValid },

    control
  } = form

  const values = form.watch()

  const onSubmit = () => {
    mutation.mutate(values, {
      onSuccess: data => {
        toast.success('Sucesso')

        authState.data = data
        authState.logged = true

        router.push('/')
      }
    })
  }

  return (
    <div className="bg-background flex h-screen w-screen flex-col items-center justify-center p-4">
      <Form {...form}>
        <form
          className="bg-card border-border flex w-full max-w-sm flex-col items-center rounded-lg border p-6 shadow-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3 flex w-full flex-col items-start justify-center gap-1">
            <h1 className="text-primary text-start text-2xl font-semibold">
              Bem-vindo
            </h1>
            <p className="text-base">Comece criando seu perfil</p>
          </div>

          <div className="mt-8 flex w-full flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              {(avatars.slice(0, 3).includes(values.avatar)
                ? avatars.slice(0, 3)
                : [
                    values.avatar,
                    ...avatars.filter(e => e != values.avatar).slice(0, 2)
                  ]
              ).map((avatar, i) => (
                <AvatarButton
                  key={avatar + i}
                  onClick={() => setValue('avatar', avatar)}
                  active={avatar == values.avatar}
                  src={'/assets/'.concat(avatar).concat('.jpg')}
                  title={avatar}
                />
              ))}

              <AvatarsDialog
                avatar={values.avatar}
                onChange={avatar => setValue('avatar', avatar)}
              >
                <Button size="icon" variant="outline" className="rounded-full">
                  <Plus />
                </Button>
              </AvatarsDialog>
            </div>
          </div>

          <div className="w-full">
            <div className="my-8 flex w-full flex-col gap-2">
              <FormField
                control={control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apelido</FormLabel>
                    <FormControl>
                      <Input placeholder="Peter Packer" {...field} />
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
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={!isValid} className="w-full uppercase">
              {mutation.isPending ? (
                <Loading name="mirage" color="red" size="60" speed="1.75" />
              ) : (
                'Continuar'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SignUp

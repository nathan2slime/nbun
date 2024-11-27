'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { signUpMutation } from '~/api/mutations/signup.mutation'
import { AvatarButton } from '~/components/avatar-button'
import { AvatarsDialog } from '~/components/avatars-dialog'
import { Props } from '~/components/loading'
import { Button } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Separator } from '~/components/ui/separator'
import { avatars } from '~/lib/avatars'
import { SignUpSchema, signUpSchema } from '~/lib/schemas/auth.schemas'
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
      password: '',
      username: '',
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

        authState.session = data
        authState.logged = true

        router.push('/')
      }
    })
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background p-4">
      <Form {...form}>
        <form
          className="flex w-full max-w-sm flex-col items-center rounded-lg border border-border bg-card p-6 shadow-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3 flex w-full flex-col items-start justify-center gap-1">
            <h1 className="text-start font-semibold text-2xl text-primary">
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
                    ...avatars.filter(e => e !== values.avatar).slice(0, 2)
                  ]
              ).map((avatar, i) => (
                <AvatarButton
                  key={`${avatar}_avatar`}
                  onClick={() => setValue('avatar', avatar)}
                  active={avatar === values.avatar}
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
                      <Input
                        autoComplete="off"
                        placeholder="Peter Packer"
                        {...field}
                      />
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
                      <Input autoComplete="off" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={!isValid} className="w-full uppercase">
              {mutation.isPending ? (
                <Loading name="mirage" size="60" speed="1.75" />
              ) : (
                'Continuar'
              )}
            </Button>

            <Separator className="my-6" />

            <Link href="/auth/signing" className="w-full font-semibold text-sm">
              <Button className="w-full" variant="outline">
                Login
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SignUp

'use client'

import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dynamic from 'next/dynamic'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { Input } from '~/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form'
import { signingSchema, SigningSchema } from '~/lib/schemas/auth.schemas'
import { signingMutation } from '~/api/mutations/signing.mutation'
import { Button } from '~/components/ui/button'
import { Props } from '~/components/loading'
import { authState } from '~/store/auth.state'
import { Separator } from '~/components/ui/separator'

const Signing: NextPage = () => {
  const router = useRouter()
  const Loading = dynamic<Props>(
    async () => (await import('~/components/loading')).Loading,
    { ssr: false }
  )

  const mutation = useMutation({
    mutationKey: ['signing'],
    mutationFn: signingMutation
  })

  const form = useForm<SigningSchema>({
    mode: 'all',
    defaultValues: {
      password: '',
      username: ''
    },
    resolver: zodResolver(signingSchema)
  })

  const {
    handleSubmit,
    formState: { isValid },
    control
  } = form

  const onSubmit = (values: SigningSchema) =>
    mutation.mutate(values, {
      onSuccess(data) {
        toast.success('Sucesso')

        authState.session = data
        authState.logged = true

        router.push('/')
      }
    })

  return (
    <div className="bg-background flex h-screen w-screen flex-col items-center justify-center p-4">
      <Form {...form}>
        <form
          className="bg-card border-border flex w-full max-w-sm flex-col rounded-lg border p-6 shadow-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3 flex w-full flex-col items-start justify-center gap-1">
            <h1 className="text-primary text-start text-2xl font-semibold">
              Bem-vindo
            </h1>
            <p className="text-base">Faça seu login abaixo</p>
          </div>

          <div className="my-8 flex flex-col gap-2">
            <FormField
              control={control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apelido</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Peter Packer"
                      autoComplete="off"
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
                    <Input
                      {...field}
                      autoComplete="off"
                      autoCapitalize="password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={!isValid} className="uppercase">
            {mutation.isPending ? (
              <Loading name="mirage" size="60" speed="1.75" />
            ) : (
              'Continuar'
            )}
          </Button>

          <Separator className="my-6" />

          <Link href="/auth/signup" className="w-full text-sm font-semibold">
            <Button className="w-full" variant="outline">
              Crie seu perfil
            </Button>
          </Link>
        </form>
      </Form>
    </div>
  )
}

export default Signing

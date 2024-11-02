'use client'

import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dynamic from 'next/dynamic'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

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

        authState.data = data
        authState.logged = true

        router.push('/')
      }
    })

  return (
    <div className="bg-background flex h-screen w-screen flex-col items-center justify-center p-4">
      <Form {...form}>
        <form
          className="bg-card border-border flex w-full max-w-md flex-col rounded-lg border px-4 py-6 shadow-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-primary text-xl font-semibold">Bem-vindo</h1>

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
                      autoComplete="username"
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
              <Loading name="mirage" color="red" size="60" speed="1.75" />
            ) : (
              'Continuar'
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Signing

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { PenLine, Plus } from 'lucide-react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { AvatarsDialog } from '~/components/avatars-dialog'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { ProfileSchema, profileSchema } from '~/lib/schemas/profile.schemas'

import { DialogClose } from '@radix-ui/react-dialog'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'

const Profile = () => {
  const user = {
    name: 'Samuel Sanderson',
    avatar: 'woin'
  }

  const form = useForm<ProfileSchema>({
    mode: 'all',
    defaultValues: {
      avatar: user.avatar,
      username: user.name
    },
    resolver: zodResolver(profileSchema)
  })

  const { setValue } = form

  const values = form.watch()

  const changeProfile = (values: ProfileSchema) => {}

  return (
    <div className="min-h-screen w-full p-3">
      <p className="text-center font-semibold text-2xl tracking-wide">
        Profile
      </p>
      <div className="mt-8 flex w-full flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <Image
            className="size-[80px] rounded-full object-cover"
            src={'/assets/'.concat(values.avatar).concat('.jpg')}
            alt={values.avatar}
            width={60}
            height={60}
          />

          <AvatarsDialog
            avatar={values.avatar}
            onChange={avatar => setValue('avatar', avatar)}
          >
            <Button size="icon" variant="outline" className="rounded-full">
              <Plus />
            </Button>
          </AvatarsDialog>
        </div>

        <p className="text-xl"> Olá, {values.username}!</p>

        <div className="flex w-full max-w-64 space-y-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full text-lg" size="sm">
                <PenLine className="mr-2 h-4 w-4" />
                Editar Perfil
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar perfil de usuário</DialogTitle>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(changeProfile)}>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="fulano" {...field} />
                        </FormControl>
                        <FormDescription>seu nome de perfil.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter className="mt-1">
                    <DialogClose asChild>
                      <Button className="inline-block" type="submit">
                        Salvar alterações
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="my-8 grid w-full max-w-64 grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <div className="font-bold text-2xl">15</div>
            <div className="text-muted-foreground text-sm">Quizzes Criados</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="font-bold text-2xl">42</div>
            <div className="text-muted-foreground text-sm">
              Quizzes participados
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile

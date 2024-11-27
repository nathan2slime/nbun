"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { PenLine, Plus } from "lucide-react"
import { AvatarsDialog } from "~/components/avatars-dialog"
import { Button } from "~/components/ui/button"
import { ProfileSchema, profileSchema } from "~/lib/schemas/profile.schemas"
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { Card } from "~/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { DialogClose } from "@radix-ui/react-dialog"


const Profile = () => {

  const user = {
    name: "Samuel Sanderson",
    avatar: "woin",
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

  const changeProfile = (values: ProfileSchema) => {
    console.log(values);
    
  }

  return (
    <div className="min-h-screen w-full p-3">
      <p className="font-semibold text-2xl tracking-wide text-center">Profile</p>
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

            <div className="w-full space-y-3 max-w-64 flex">

              <Dialog>
                <DialogTrigger asChild >
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
                          <Button className="inline-block" type="submit">Salvar alterações</Button>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  </Form>
                  
                </DialogContent>
              </Dialog>
            
            </div>

            <div className="w-full grid grid-cols-2 gap-4 my-8 max-w-64">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm text-muted-foreground">Quizzes Criados</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold">42</div>
                <div className="text-sm text-muted-foreground">Quizzes participados</div>
              </Card>
            </div>
          </div>
    </div>
  )
}

export default Profile

'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog'
import { SquarePlus } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { questionSchema } from '~/lib/schemas/quiz.schemas'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form'
import { QuestionQuizFormData, QuestionQuizPayload } from '~/types/quiz.types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'
import { useMutation } from '@tanstack/react-query'
import { createQuestionMutation } from '~/api/mutations/quiz/question/create-question.mutation'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { DIFFICULTIES } from '~/constants'

type props = {
  questionId: string
  onCreated: () => void
}

export const DialogCreateQuestion = ({ questionId, onCreated }: props) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  const form = useForm<QuestionQuizFormData>({
    resolver: zodResolver(questionSchema),
    mode: 'onBlur'
  })

  const mutation = useMutation({
    mutationKey: ['create-question'],
    mutationFn: createQuestionMutation
  })

  const { handleSubmit, control, formState } = form

  const onSubmit = (values: QuestionQuizFormData) => {
    const payload: QuestionQuizPayload = {
      difficulty: values.difficulty,
      title: values.title,
      quizId: questionId
    }

    mutation.mutate(payload, {
      onSuccess(data) {
        toast.success('Questão criada!')
        onCreated()
        setIsOpenDialog(false)
      }
    })
  }

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <SquarePlus />
          Questões
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crie uma questão</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Pergunta da questão.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dificuldade</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma dificuldade para questão" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DIFFICULTIES.map(difficulty => (
                        <SelectItem
                          key={difficulty.value}
                          value={difficulty.value}
                        >
                          {difficulty.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex justify-end">
              <Button type="submit">Criar Questão</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

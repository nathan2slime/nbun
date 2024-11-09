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

type props = {
  questionId: string
}

export const DialogCreateQuestion = ({ questionId }: props) => {
  const form = useForm<QuestionQuizFormData>({
    resolver: zodResolver(questionSchema),
    mode: 'onBlur'
  })

  const difficulties = [
    {
      name: 'Fácil',
      value: 'EASY'
    },
    {
      name: 'Médio',
      value: 'MEDIUM'
    },
    {
      name: 'Difícil',
      value: 'HARD'
    }
  ]

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

    mutation.mutate(payload)
  }

  return (
    <Dialog>
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
                      {difficulties.map(difficulty => (
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
          </form>
        </Form>
        <DialogFooter className="flex justify-end">
          <Button type="submit">Criar Questão</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

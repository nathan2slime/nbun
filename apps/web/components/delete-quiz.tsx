'use client'

import { useMutation } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { deleteQuizMutation } from '~/api/mutations/quiz/delete-quiz.mutation'

import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '~/components/ui/dialog'

type Props = {
  onDelete: (id: string) => unknown
}

export const DeleteQuiz = ({ onDelete }: Props) => {
  const params = useSearchParams()

  const [open, setOpen] = useState(false)

  const mutation = useMutation({
    mutationFn: deleteQuizMutation
  })

  const handleDelete = () => {
    const id = params.get('delete')

    if (id) {
      mutation.mutateAsync(id, {
        onSuccess: () => {
          onDelete(id)
          setOpen(false)
        }
      })
    }
  }

  useEffect(() => {
    const id = params.get('delete')

    setOpen(!!id)
  }, [params])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="text-start">
          <DialogTitle>Tem certeza disso?</DialogTitle>
          <DialogDescription>
            Isso não pode ser desfeito. Essa ação vai deletar seu quiz.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="grid grid-cols-2 gap-2">
          <Button onClick={handleDelete} variant="destructive" type="submit">
            Deletar
          </Button>
          <Button onClick={() => setOpen(false)} variant="outline">
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

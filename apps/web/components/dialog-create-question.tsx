'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog'
import { SquarePlus } from 'lucide-react'
import { Button } from '~/components/ui/button'

export const DialogCreateQuestion = () => {
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
      </DialogContent>
    </Dialog>
  )
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog'
import { SquarePlus } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Form } from '~/components/ui/form'

const DialogCreateQuestion = () => {
  return (
    <Dialog>
      <DialogTrigger>
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

export default DialogCreateQuestion

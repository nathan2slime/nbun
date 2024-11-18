import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useContext } from 'react'
import toast from 'react-hot-toast'

import { createOptionMutation } from '~/api/mutations/quiz/question/option/create-option.mutation'
import { EditQuizContext } from '~/components/edit-quiz'
import { Button } from '~/components/ui/button'
import { CreateOptionPayload, OptionResponse } from '~/types/quiz.types'

type Props = {
  questionId: string
  disabled: boolean
}

export const CreateOption = ({ questionId, disabled }: Props) => {
  const { quizId } = useContext(EditQuizContext)

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['create-option'],
    mutationFn: createOptionMutation
  })

  const updateOptions = (payload: CreateOptionPayload) => {
    const id = Math.random().toString()

    queryClient.setQueryData(
      ['get-options', questionId],
      (prev: OptionResponse[] = []) =>
        prev.length >= 4 ? prev : [...prev, { id, ...payload }]
    )

    return id
  }

  const createOption = () => {
    const payload = {
      title: 'Nova alternativa',
      questionId,
      quizId
    }

    const id = updateOptions(payload)

    mutation.mutate(payload, {
      onSuccess(data) {
        queryClient.setQueryData(
          ['get-options', questionId],
          (prev: OptionResponse[] = []) =>
            prev.map(e => (e.id == id ? data : e))
        )

        toast.success('Nova opção criada!')
      }
    })
  }

  return (
    <Button disabled={disabled} onClick={createOption} className="w-full">
      <Plus strokeWidth={1} width={22} />
      Alternativa
    </Button>
  )
}

import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { updateOptionMutation } from '~/api/mutations/quiz/question/option/update-option.mutation'
import { Input } from '~/components/ui/input'
import { OptionResponse } from '~/types/quiz.types'
import { DeleteOption } from '~/components/delete-question-option'

type Props = {
  data: OptionResponse
  onUpdate: () => void
}

export const Option = ({ data, onUpdate }: Props) => {
  const [option, setOption] = useState(data)

  const mutation = useMutation({
    mutationKey: ['update-option'],
    mutationFn: updateOptionMutation
  })

  const updateOption = () => {
    const payload = {
      title: option.title,
      id: option.id
    }

    mutation.mutate(payload, {
      onSuccess() {
        onUpdate()
      }
    })
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Input
        onBlur={updateOption}
        value={option.title}
        onChange={e => setOption({ ...option, title: e.target.value })}
      />
      <DeleteOption onUpdate={onUpdate} optionId={option.id} />
    </div>
  )
}

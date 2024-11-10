import z from 'zod'
import { REQUIRED_ERROR } from '~/constants'

export const questionSchema = z.object({
  title: z
    .string({
      required_error: REQUIRED_ERROR
    })
    .min(3, {
      message: 'O titulo deve conter no mínimo 3 letras.'
    }),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD'], {
    required_error: REQUIRED_ERROR
  })
})

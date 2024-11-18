import z from 'zod'
import { REQUIRED_ERROR } from '~/constants'
import { Difficulty } from '~/types/quiz.types'

export const questionSchema = z.object({
  title: z
    .string({
      required_error: REQUIRED_ERROR
    })
    .min(3, {
      message: 'O titulo deve conter no mínimo 3 letras'
    }),
  difficulty: z.nativeEnum(Difficulty, {
    required_error: REQUIRED_ERROR
  })
})
export type QuestionQuizFormData = z.infer<typeof questionSchema>

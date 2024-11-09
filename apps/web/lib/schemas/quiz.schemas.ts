import z from 'zod'

export const questionSchema = z.object({
  title: z.string({
    required_error: 'Titulo é obrigatorio'
  }),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD'])
})

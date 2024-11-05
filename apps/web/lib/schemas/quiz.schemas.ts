import z from 'zod'

export const questionSchema = z.object({
  title: z.string(),
  quizId: z.string(),
  difficulty: z.string()
})

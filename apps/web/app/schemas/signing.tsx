import z from 'zod'

export const signingSchema = z.object({
  username: z
    .string({
      required_error: 'O nome é obrigatório'
    })
    .min(3),
  password: z
    .string({
      required_error: 'A senha é obrigatória'
    })
    .min(6)
})

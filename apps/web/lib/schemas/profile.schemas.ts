import z from 'zod'
import { avatars } from '~/lib/avatars'

export const profileSchema = z.object({
  avatar: z.string().default(avatars[0]!),
  username: z.string({
    required_error: 'O campo "username" é obrigatório'
  })
})

export type ProfileSchema = z.infer<typeof profileSchema>

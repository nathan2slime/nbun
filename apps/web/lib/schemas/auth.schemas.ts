import z from 'zod'

import { required_error } from '~/lib/schemas'

export const signUpSchema = z.object({
  username: z
    .string({
      required_error
    })
    .min(1, required_error)
    .max(12),
  password: z
    .string({
      required_error
    })
    .min(4, required_error),
  avatar: z.string().default('woin')
})

export type SignUpSchema = z.infer<typeof signUpSchema>

export const signingSchema = z.object({
  username: z
    .string({
      required_error
    })
    .min(1, required_error),
  password: z
    .string({
      required_error
    })
    .min(1, required_error)
})

export type SigningSchema = z.infer<typeof signingSchema>

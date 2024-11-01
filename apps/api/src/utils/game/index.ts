import { Difficulty } from '@prisma/client'

export const scoringRule: Record<Difficulty, number> = {
  EASY: 1,
  HARD: 2,
  MEDIUM: 3
}

export const timeRule: Record<Difficulty, number> = {
  EASY: 15,
  MEDIUM: 25,
  HARD: 35
}

import { z } from 'zod'

const CURRENCY_TYPE = ['USD', 'ARS']

const TeamSchema = z.object({
  _id: z.string().uuid(),
  name: z.string().max(36),
  currency: z.string().max(36).toUpperCase()
    .refine((currency) => {
      return CURRENCY_TYPE.findIndex((value) => value === currency) !== -1
    }, { message: 'INVALID CURRENCY TYPE' })
})

const JoinTeamSchema = z.object({
  user_id: z.string().uuid(),
  team_id: z.string().uuid()
})

function validateTeam (data) {
  return TeamSchema.safeParse(data)
}

function validateJoinTeam (data) {
  return JoinTeamSchema.safeParse(data)
}

export { validateTeam, validateJoinTeam }

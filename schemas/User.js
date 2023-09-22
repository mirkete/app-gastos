import { z } from 'zod'

const UserSchema = z.object({
  _id: z.string().uuid(),
  name: z.string().max(36)
})

function validateUser (user) {
  return UserSchema.safeParse(user)
}

export { validateUser }

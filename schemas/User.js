import { z } from 'zod'

const UserSchema = z.object({
  _id: z.string().uuid(),
  name: z.string().max(36)
})

const UUIDSchema = z.object({
  _id: z.string().uuid()
})

const UUIDsArraySchema = z.array(z.string().uuid())

function validateUser (user) {
  return UserSchema.safeParse(user)
}

function validateUUID (id) {
  return UUIDSchema.safeParse(id)
}

function validateUUIDs (UUIDs) {
  return UUIDsArraySchema.safeParse(UUIDs)
}

export { validateUser, validateUUID, validateUUIDs }

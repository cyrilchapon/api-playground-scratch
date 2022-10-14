import { Prisma, User } from '@prisma/client'
import { z } from 'zod'
import { Concrete, TimestampFields } from './util'
import { createSchema } from './_schema'

export const userPayloadSchema = createSchema<User>(
  'user',
  z.object({
    id: z.string(),
    nickName: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
  }).strict()
)

export type UserCreateAnonymousInput = Omit<
  Prisma.UserCreateWithoutPostInput,
  keyof Prisma.UserWhereUniqueInput | TimestampFields
>
export const userCreationSchema = createSchema<UserCreateAnonymousInput>(
  'user-creation',
  z.object({
    nickName: z.string()
  }).strict()
)

export type UserFindUniqueInput = Concrete<Prisma.UserWhereUniqueInput>
export const userFindUniqueSchema = createSchema<UserFindUniqueInput>(
  '',
  z.object({
    id: z.string()
  })
)

import { User } from '@prisma/client'
import { z } from 'zod'
import { prismaClientSingleton } from '../../database'
import { createVah } from '../../util/validated-handler'

const prisma = prismaClientSingleton()

export const create = createVah({
  body: z.object({
    nickName: z.string()
  }).strict()
})<User>(async (req, res) => {
  const createdUser = await prisma.user.create({ data: req.body })

  res.status(201)
  res.json(createdUser)
})

export const find = createVah({
  params: z.object({
    id: z.string().uuid()
  }).strict()
})<User>(async (req, res) => {
  const foundUser = await prisma.user.findUniqueOrThrow({ where: { id: req.params.id } })

  res.json(foundUser)
})

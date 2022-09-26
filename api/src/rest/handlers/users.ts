import { User } from '@prisma/client'
import { z } from 'zod'
import { prismaClientSingleton } from '../../database'
import { paginationArgs, paginationQuerySchema } from '../../util/pagination'
import { createVmah } from '../../util/validated-handler'

const prisma = prismaClientSingleton()

export const create = createVmah({
  body: z.object({
    nickName: z.string()
  }).strict()
})<User>(async (req) => {
  const createdUser = await prisma.user.create({ data: req.body })

  return {
    statusCode: 201,
    body: createdUser
  }
})

export const find = createVmah({
  params: z.object({
    id: z.string().uuid()
  }).strict()
})<User>(async (req) => {
  const foundUser = await prisma.user.findUniqueOrThrow({ where: { id: req.params.id } })

  return {
    body: foundUser
  }
})

export const list = createVmah({
  query: paginationQuerySchema()
})<User[]>(async (req) => {
  const users = await prisma.user.findMany({
    ...paginationArgs(req.query)
  })

  return {
    body: users
  }
})

import { User } from '@prisma/client'
import { prismaClientSingleton } from '../../database'
import { userPayloadSchema, userCreationSchema } from '../../schemas/user'
import { createEndpoint } from '../../util/endpoint'
import { paginationArgs, paginationQuerySchema } from '../../util/pagination'

const prisma = prismaClientSingleton()

export const create = createEndpoint({
  body: userCreationSchema.zod,
  res: userPayloadSchema.zod
})({
  responses: {
    '201': {
      description: 'Hey ho',
      content: {
        'application/json': {
          schema: {
            $ref: `#/components/schemas/${userPayloadOpenApiSchema.$ref}`
          }
        }
      }
    }
  }
})(async (req) => {
  const createdUser = await prisma.user.create({ data: req.body })

  return {
    statusCode: 201,
    body: createdUser
  }
})

export const find = createEndpoint({
  params: userFindUniqueZodSchema
})<User>({
  responses: {

  }
})(async (req) => {
  const foundUser = await prisma.user.findUniqueOrThrow({ where: { id: req.params.id } })

  return {
    body: foundUser
  }
})

export const list = createEndpoint({
  query: paginationQuerySchema()
})<User[]>({
  responses: {

  }
})(async (req) => {
  const users = await prisma.user.findMany({
    ...paginationArgs(req.query)
  })

  return {
    body: users
  }
})

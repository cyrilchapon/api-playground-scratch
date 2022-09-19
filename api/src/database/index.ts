import { PrismaClient } from '@prisma/client'

let prismaClient: PrismaClient | null

const singleton = (): PrismaClient => {
  prismaClient ??= new PrismaClient()
  return prismaClient
}

export {
  singleton as prismaClientSingleton
}

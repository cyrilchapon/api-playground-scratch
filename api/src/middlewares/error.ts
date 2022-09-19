import { boomify, Boom } from '@hapi/boom'
import { Prisma } from '@prisma/client'
import { ErrorRequestHandler } from 'express'

const logger: ErrorRequestHandler = (err: Error, req, res, next) => {
  console.error(err)
  next(err)
}

interface BodyParserError extends SyntaxError {
  status: 400
}
const isBodyParserError = (err: Error): err is BodyParserError => (
  err instanceof SyntaxError && (err as BodyParserError).status === 400
)

const bodyParserToBoom: ErrorRequestHandler = (err: Error, req, res, next) => {
  if (isBodyParserError(err)) {
    err = boomify(err)
  }

  next(err)
}

const prismaToBoom: ErrorRequestHandler = (err: Error, req, res, next) => {
  if (err instanceof Prisma.NotFoundError) {
    err = boomify(err, { statusCode: 404 })
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // TODO: handle this correctly
    // see: https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
    // if (err.code === '') {

    // }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    err = boomify(err, { statusCode: 400 })
  } else if (
    err instanceof Prisma.PrismaClientUnknownRequestError ||
    err instanceof Prisma.PrismaClientRustPanicError
  ) {
    err = boomify(err, { statusCode: 500 })
  }

  return next(err)
}

const isBoomError = (err: Error): err is Boom => (
  (err as Boom).isBoom
)
const handleBoom: ErrorRequestHandler = (err: Error, req, res, next) => {
  if (isBoomError(err)) {
    res.status(err.output.statusCode)
    res.json({
      ...err.output.payload,
      ...(err.data != null ? { data: err.data } : {})
    })
    return
  }

  next(err)
}

export {
  logger,
  bodyParserToBoom,
  prismaToBoom,
  handleBoom
}

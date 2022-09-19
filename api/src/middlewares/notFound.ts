import { notFound } from '@hapi/boom'
import { RequestHandler } from 'express'

export const notFoundHandler: RequestHandler = (req, res, next) => {
  next(notFound())
}

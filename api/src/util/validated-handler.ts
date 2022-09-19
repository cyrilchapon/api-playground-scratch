import { RequestValidation, validateRequest } from 'zod-express-middleware'
import { RequestHandler } from 'express'
import { z, ZodSchema } from 'zod'
import { AsyncRequestHandler, createAsyncHandler } from './async-handler'

const createVh = <
  TVParams = any,
  TVQuery = any,
  TVBody = any
> (
    schemas: RequestValidation<TVParams, TVQuery, TVBody>
  ) => <
    ResBody = any,
    P = z.infer<ZodSchema<TVParams>>,
    ReqBody = z.infer<ZodSchema<TVBody>>,
    ReqQuery = z.infer<ZodSchema<TVQuery>>
  > (
    handler: RequestHandler<P, ResBody, ReqBody, ReqQuery>
  ): [
    RequestHandler<TVParams, any, TVBody, TVQuery>,
    RequestHandler<P, ResBody, ReqBody, ReqQuery>
  ] => ([
    validateRequest(schemas),
    handler
  ])

const createVah = <
  TVParams = any,
  TVQuery = any,
  TVBody = any
> (
    schemas: RequestValidation<TVParams, TVQuery, TVBody>
  ) => <
    ResBody = any,
    P = z.infer<ZodSchema<TVParams>>,
    ReqBody = z.infer<ZodSchema<TVBody>>,
    ReqQuery = z.infer<ZodSchema<TVQuery>>
  > (
    handler: AsyncRequestHandler<P, ResBody, ReqBody, ReqQuery>
  ): [
    RequestHandler<TVParams, any, TVBody, TVQuery>,
    RequestHandler<P, ResBody, ReqBody, ReqQuery>
  ] => ([
    validateRequest(schemas),
    createAsyncHandler(handler)
  ])

export {
  createVh,
  createVah
}

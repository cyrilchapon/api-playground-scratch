import { processRequest } from 'zod-express-middleware'
import { RequestHandler } from 'express'
import { z, ZodType } from 'zod'
import { AsyncManagedRequestHandler, AsyncRequestHandler, createAsyncHandler, createAsyncManagedHandler } from './async-handler'

const createVh = <
  TVParams = any,
  TVQuery = any,
  TVBody = any,
  ZVParams extends ZodType<TVParams> = ZodType<TVParams>,
  ZVQuery extends ZodType<TVQuery> = ZodType<TVQuery>,
  ZVBody extends ZodType<TVBody> = ZodType<TVBody>
> (
    schemas: {
      params?: ZVParams,
      query?: ZVQuery,
      body?: ZVBody
    }
  ) => <
    ResBody = any,
    P = z.infer<ZVParams>,
    ReqBody = z.infer<ZVBody>,
    ReqQuery = z.infer<ZVQuery>
  > (
    handler: RequestHandler<P, ResBody, ReqBody, ReqQuery>
  ): [
    RequestHandler<TVParams, any, TVBody, TVQuery>,
    RequestHandler<P, ResBody, ReqBody, ReqQuery>
  ] => ([
    processRequest(schemas),
    handler
  ])

const createVah = <
  TVParams = any,
  TVQuery = any,
  TVBody = any,
  ZVParams extends ZodType<TVParams> = ZodType<TVParams>,
  ZVQuery extends ZodType<TVQuery> = ZodType<TVQuery>,
  ZVBody extends ZodType<TVBody> = ZodType<TVBody>
> (
    schemas: {
      params?: ZVParams,
      query?: ZVQuery,
      body?: ZVBody
    }
  ) => <
    ResBody = any,
    P = z.infer<ZVParams>,
    ReqBody = z.infer<ZVBody>,
    ReqQuery = z.infer<ZVQuery>
  > (
    handler: AsyncRequestHandler<P, ResBody, ReqBody, ReqQuery>
  ): [
    RequestHandler<TVParams, any, TVBody, TVQuery>,
    RequestHandler<P, ResBody, ReqBody, ReqQuery>
  ] => ([
    processRequest(schemas),
    createAsyncHandler(handler)
  ])

const createVmah = <
  TVParams = any,
  TVQuery = any,
  TVBody = any,
  ZVParams extends ZodType<TVParams> = ZodType<TVParams>,
  ZVQuery extends ZodType<TVQuery> = ZodType<TVQuery>,
  ZVBody extends ZodType<TVBody> = ZodType<TVBody>
> (
    schemas: {
      params?: ZVParams,
      query?: ZVQuery,
      body?: ZVBody
    }
  ) => <
    ResBody = any,
    P = z.infer<ZVParams>,
    ReqBody = z.infer<ZVBody>,
    ReqQuery = z.infer<ZVQuery>
  > (
    handler: AsyncManagedRequestHandler<P, ResBody, ReqBody, ReqQuery>
  ): [
    RequestHandler<TVParams, any, TVBody, TVQuery>,
    RequestHandler<P, ResBody, ReqBody, ReqQuery>
  ] => ([
    processRequest(schemas),
    createAsyncManagedHandler(handler)
  ])

export {
  createVh,
  createVah,
  createVmah
}

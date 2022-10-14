import { RequestHandler } from 'express'
import { z, ZodType } from 'zod'
import { AsyncManagedRequestHandler } from './async-handler'
import { createVmah } from './validated-handler'
import { OperationObject } from 'openapi3-ts'

const createEndpoint = <
  TVParams = any,
  TVQuery = any,
  TVBody = any,
  TVResBody = any,
  ZVParams extends ZodType<TVParams> = ZodType<TVParams>,
  ZVQuery extends ZodType<TVQuery> = ZodType<TVQuery>,
  ZVBody extends ZodType<TVBody> = ZodType<TVBody>,
  ZVResBody extends ZodType<TVResBody> = ZodType<TVResBody>
> (
    schemas: {
      params?: ZVParams,
      query?: ZVQuery,
      body?: ZVBody,
      res?: ZVResBody
    }
  ) => <
    ResBody = z.infer<ZVResBody>,
    P = z.infer<ZVParams>,
    ReqBody = z.infer<ZVBody>,
    ReqQuery = z.infer<ZVQuery>
  > (
    docOpts: OperationObject
  ) => (
    handler: AsyncManagedRequestHandler<P, ResBody, ReqBody, ReqQuery>
  ): {
    handler: [
      RequestHandler<TVParams, any, TVBody, TVQuery>,
      RequestHandler<P, ResBody, ReqBody, ReqQuery>
    ],
    docs: OperationObject
  } => {
    return ({
      handler: createVmah(schemas)(handler),
      docs: docOpts
    })
  }

export {
  createEndpoint
}

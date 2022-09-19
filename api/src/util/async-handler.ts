import type {
  ParamsDictionary,
  Query
} from 'express-serve-static-core'

import {
  RequestHandler,
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction
} from 'express'

type AsyncRequestHandler<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Query
> = (
  req: Request<P, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>,
  next: NextFunction
) => Promise<void>

type AsyncErrorRequestHandler<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Query
> = (
  err: any,
  req: Request<P, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>,
  next: NextFunction
) => Promise<void>

const createAsyncHandler = <
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Query
> (handler: AsyncRequestHandler<P, ResBody, ReqBody, ReqQuery>): RequestHandler<
  P,
  ResBody,
  ReqBody,
  ReqQuery
  > => {
  return (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction
  ) => {
    handler(req, res, next)
      .catch(next)
  }
}

const createAsyncErrorHandler = <
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Query
> (handler: AsyncErrorRequestHandler<P, ResBody, ReqBody, ReqQuery>): ErrorRequestHandler<
  P,
  ResBody,
  ReqBody,
  ReqQuery
  > => {
  return async (
    err: any,
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction
  ) => {
    handler(err, req, res, next)
      .catch(next)
  }
}

export { createAsyncHandler, createAsyncErrorHandler }
export type { AsyncRequestHandler, AsyncErrorRequestHandler }

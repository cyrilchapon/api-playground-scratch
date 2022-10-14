import { PathItemObject } from 'openapi3-ts'

import * as handlers from './handlers'

const routeDocs = new Map<string, PathItemObject>()

routeDocs.set('/users', {
  post: handlers.user.create.docs,
  get: handlers.user.list.docs
})
routeDocs.set('/users/:id', {
  get: handlers.user.find.docs
})

export { routeDocs }

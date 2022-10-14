import { SchemaObject } from 'openapi3-ts'
import * as schemas from '.'

const componentsDocs = new Map<string, SchemaObject>()

componentsDocs.set(
  schemas.user.userCreationSchema.openapi.$ref,
  schemas.user.userCreationSchema.openapi.schema
)
componentsDocs.set(
  schemas.user.userPayloadSchema.openapi.$ref,
  schemas.user.userPayloadSchema.openapi.schema
)

export { componentsDocs }

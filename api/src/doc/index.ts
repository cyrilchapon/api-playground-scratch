import { OpenApiBuilder, OpenAPIObject } from 'openapi3-ts'
import deepMerge from 'ts-deepmerge'

import { routeDocs } from '../rest/docs'
import { componentsDocs } from '../schemas/openapi/docs'

const baseOptions: OpenAPIObject = {
  openapi: '3.0.0',
  info: {
    title: 'Hello World',
    version: '1.0.0',
  },
  paths: Object.fromEntries(routeDocs),
  components: {
    schemas: Object.fromEntries(componentsDocs)
  }
}

const createDoc = (options: Partial<OpenAPIObject> = {}) => {
  const fullOptions = deepMerge(baseOptions, options)

  const builder = new OpenApiBuilder(fullOptions)

  return builder.getSpec()
}

export { createDoc }

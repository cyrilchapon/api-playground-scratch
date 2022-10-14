import { generateSchema } from '@anatine/zod-openapi'
import { SchemaObject } from 'openapi3-ts'
import { z } from 'zod'

export type SchemaObjectWithRef <T> = {
  zod: z.ZodType<T>,
  openapi: {
    schema: SchemaObject
    $ref: string
  }
}

export const createSchema = <T> (
  $ref: string,
  zodSchema: z.ZodType<T>
): SchemaObjectWithRef<T> => ({
  zod: zodSchema,
  openapi: {
    $ref,
    schema: generateSchema(zodSchema)
  }
})

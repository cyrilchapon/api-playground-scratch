import { SchemaObject } from 'openapi3-ts'

export type TimestampFields = 'createdAt' | 'updatedAt'

export type Concrete <T extends {}> = {
  [Prop in keyof T]-?: T[Prop]
}

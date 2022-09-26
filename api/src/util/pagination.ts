import { z, ZodType } from 'zod'

const stringToNumberSchema = (def?: number) => (
  def != null
    ? z.string().default(`${def}`).transform(Number)
    : z.string().transform(Number)
)
const safePreprocessor = <Output, ErrorVal, Z extends ZodType<Output>> (preprocessorSchema: Z, errVal: ErrorVal) => (val: unknown): Output | ErrorVal => {
  const parsed = preprocessorSchema.safeParse(val)
  if (!parsed.success) {
    return errVal
  }
  return parsed.data
}

const _paginationSchema = z.object({
  skip: z.preprocess(
    safePreprocessor(stringToNumberSchema(0), NaN),
    z.number().min(0)
  ),
  limit: z.preprocess(
    safePreprocessor(stringToNumberSchema(20), NaN),
    z.number().min(0).max(100)
  )
}).strict()

export type PaginationQuery = z.infer<typeof _paginationSchema>

export const paginationQuerySchema = <Z extends z.ZodRawShape>(additionalQuery?: Z) => {
  const additionalQuerySchema = z.object(additionalQuery ?? {}).omit({
    skip: true,
    limit: true
  })

  return _paginationSchema.merge(additionalQuerySchema)
}

export const paginationArgs = (query: PaginationQuery) => ({
  skip: query.skip,
  take: query.limit
})

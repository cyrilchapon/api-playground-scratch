import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import { createDoc } from '.'

const router = Router()

const spec = createDoc()
router.use(swaggerUi.serve)
router.get('/', swaggerUi.setup(spec))

export { router }

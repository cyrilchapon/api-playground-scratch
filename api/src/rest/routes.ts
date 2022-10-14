import { Router } from 'express'

import * as handlers from './handlers'

const router = Router()

router.get('/users/:id', ...handlers.user.find.handler)
router.post('/users', ...handlers.user.create.handler)
router.get('/users', ...handlers.user.list.handler)

export { router }

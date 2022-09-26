import { Router } from 'express'

import * as handlers from './handlers'

const router = Router()

router.get('/users/:id', ...handlers.user.find)
router.post('/users', ...handlers.user.create)
router.get('/users', ...handlers.user.list)

export { router }

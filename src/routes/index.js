import { Router } from 'express'

import root from './root'
import api from './api'

const router = Router()

// we are using root as middleware because all the routes
// are going to be passed through one file
// which is the route file
router.use(root)
router.use('/api', api)

export default router

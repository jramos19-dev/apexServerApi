import { Router } from 'express'

import tips from './tips'
import characters from './charaters'

const router = Router()

router.get('/', (req, res) => {
  res.json({ msg: 'API endpoint' })
})

router.use('/tips', tips)
router.use('/characters', characters)

export default router

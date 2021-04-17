// root path to servers

import { Router } from 'express'
import logger from '../helpers/logger'

const router = Router()

router.get('/', (req, res) => {
  logger.info('hello there')
  const title = process.env.TITLE || ' DEFAULT TITLE SERVER '
  res.send({ title })
})

export default router

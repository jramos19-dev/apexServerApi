import { Router } from 'express'

import * as tips from '../../services/tipsChars'
import logger from '../../helpers/logger'

const router = Router()

router.get('/', async (req, res) => {
  const tipps = await tips.getAllTips()
  res.send(tipps)
})

router.post('/', (req, res) => {
  const { tip: newTip } = req.body
  if (newTip) {
    const tip = tips.addTip(newTip)
    res.send(tip)
  } else {
    res.status(400).send({ msg: 'bad status' })
  }
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const tip = tips.getTipById(id)
  if (tip) {
    res.send(tip)
  } else {
    logger.warn('Tip doesnt exist')
    res.status(404).send({})
  }
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { tip: updatedTip } = req.body
  res.json(tips.updateTip(id, updatedTip))
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  res.json(tips.deleteTip(id))
})

export default router

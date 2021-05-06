import { Router } from 'express'

import * as tips from '../../services/tipsChars'
import logger from '../../helpers/logger'

import auth from '../../helpers/auth'

const router = Router()

router.use(auth.authenticate('local', { session: false }))
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

router.get('/:id', async (req, res) => {
  const { id } = req.params
  logger.info(id)
  const tip = await tips.getTipById(id)
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

router.get('/tipsbycharid/:charid', async (req, res) => {
  const { charid } = req.params
  const tipps = await tips.getAllTips()
  const filterTips = []
  tipps.forEach((tip) => {
    // check if tip.charid is equal to charid
    // if yes, add to filterTips
    if (tip.charId === parseInt(charid)) {
      filterTips.push(tip)
    }
  })

  res.send(filterTips)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  res.json(tips.deleteTip(id))
})

export default router

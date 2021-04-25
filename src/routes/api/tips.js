import { Router } from 'express'

import * as tips from '../../helpers/db'

const router = Router()

router.get('/', (req, res) => {
  res.json(tips.getAllTips())
})

router.post('/', (req, res) => {
  res.json({ msg: 'create a tip ' })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  res.json(tips.getTipById(id))
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  res.json({ msg: `updating tip ${id}` })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  res.json({ msg: `deleting note ${id}` })
})

export default router

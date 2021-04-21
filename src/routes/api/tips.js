import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ msg: 'get all the tips Endpoint' })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  res.json({ msg: `getting  tip : ${id} ` })
})

router.post('/', (req, res) => {
  res.json({ msg: 'create a tip ' })
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

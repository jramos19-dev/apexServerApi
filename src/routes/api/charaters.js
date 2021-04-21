import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ msg: 'get all the characters Endpoint' })
})

router.post('/', (req, res) => {
  res.json({ msg: 'create character' })
})

router.get('/:name', (req, res) => {
  const { name } = req.params
  res.json({ msg: `getting  character: ${name} ` })
})

router.put('/:name', (req, res) => {
  const { name } = req.params
  res.json({ msg: `updating ${name} in characters` })
})

router.delete('/:name', (req, res) => {
  const { name } = req.params
  res.json({ msg: `delete ${name} from characters` })
})

export default router

import { Router } from 'express'

import * as characters from '../../helpers/db'

const router = Router()

router.get('/', (req, res) => {
  res.json(characters.getAllCharacters())
})

router.post('/', (req, res) => {
  res.json({ msg: 'create character' })
})

router.get('/:name', (req, res) => {
  const { name } = req.params
  res.json(characters.getCharacterByName(name))
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  res.json({ msg: `updating ${id} in characters` })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  res.json({ msg: `delete ${id} from characters` })
})

export default router

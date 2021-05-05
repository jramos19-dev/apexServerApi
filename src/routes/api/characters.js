import { Router } from 'express'

import * as characters from '../../services/tipsChars'
import logger from '../../helpers/logger'
import auth from '../../helpers/auth'

const router = Router()

router.use(auth.authenticate('local', { session: false }))

router.get('/', async (req, res) => {
  const chars = await characters.getAllCharacters()
  res.send(chars)
})

router.post('/', async (req, res) => {
  const { character: newCharacter } = req.body
  if (newCharacter) {
    const character = await characters.addCharacter(newCharacter)
    res.send(character)
  } else {
    res.status(400).send({ msg: 'bad status' })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const character = await characters.getCharacterById(id)
  if (character) {
    res.send(character)
  } else {
    logger.warn('character doesnt exist')
    res.status(404).send({})
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params

  const response = await characters.updateCharacter(id, req.body)

  if (response.error) {
    res.status(400)
  }
  res.send(response)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  res.json(await characters.deleteCharacter(id))
})

export default router

import { Router } from 'express'

import * as characters from '../../services/tipsChars'
import logger from '../../helpers/logger'

const router = Router()

router.get('/', async (req, res) => {
  const chars = await characters.getAllCharacters()
  res.send(chars)
})

router.post('/', (req, res) => {
  const { character: newCharacter } = req.body
  if (newCharacter) {
    const character = characters.addCharacter(newCharacter)
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
  return character
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { character: updatedChar } = req.body
  const response = characters.updateCharacter(id, updatedChar)

  if (response.error) {
    res.status(400)
  }
  res.send(response)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  res.json(characters.deleteCharacter(id))
})

export default router

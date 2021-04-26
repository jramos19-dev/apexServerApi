import { Router } from 'express'

import * as characters from '../../helpers/db'
import logger from '../../helpers/logger'

const router = Router()

router.get('/', (req, res) => {
  res.send(characters.getAllCharacters())
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

router.get('/:name', (req, res) => {
  const { name } = req.params
  const character = characters.getCharacterByName(name)
  if (character) {
    res.send(character)
  } else {
    logger.warn('character doesnt exist')
    res.status(404).send({})
  }
})

router.put('/:name', (req, res) => {
  const { name } = req.params
  const { char: updatedChar } = req.body
  res.json(characters.updateCharacter(name, updatedChar))
})

router.delete('/:name', (req, res) => {
  const { name } = req.params
  res.json(characters.deleteCharacter(name))
})

export default router

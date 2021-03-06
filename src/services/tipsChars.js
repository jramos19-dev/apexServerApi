import joi from 'joi'
import logger from '../helpers/logger'
import db from '../helpers/db'

const tipsSchema = joi.object({
  title: joi.string().min(3),
  character: joi.string().min(4),
  content: joi.string().min(3),
  charId: joi.string(),
})

const charSchema = joi.object({
  name: joi.string().min(3),
  description: joi.string().min(4),
  url: joi.string(),
})

// tip functions
export const getAllTips = async () => {
  const tips = await db('tips')
  return tips
}

export const getTipById = async (id) => {
  const tip = await db('tips').where({ id }).first()
  if (tip) {
    return tip
  }
  return null
}

export const addTip = async (t) => {
  const { error } = tipsSchema.validate(t)
  if (error) {
    logger.error(error)
    return { error: error.details[0].message }
  }

  const id = await db('tips').insert({
    ...t,
    created_at: new Date(),
    updated_at: new Date(),
  })
  const tip = await getTipById(id[0])
  return tip
}

export const deleteTip = async (id) => {
  await db('tips').where({ id }).del()
  const tips = await getAllTips()
  return tips
}

export const updateTip = async (id, t) => {
  const { error } = tipsSchema.validate(t)
  if (error) {
    logger.error(error)
    return { error: error.details[0].message }
  }
  const { title, character, content, charId } = t
  let tip = await getTipById(id)
  if (tip) {
    // const { name, description } = character
    // you were basically trying to update that entry
    // with the data that was already in the db
    await db('tips').where({ id }).update({ title, character, content, charId })
    tip = await getTipById(id)
    return tip
  }
}

// character functions
export const getAllCharacters = async () => {
  const characters = await db('characters')
  return characters
}

export const getCharacterById = async (id) => {
  const character = await db('characters').where({ id }).first()
  if (character) {
    logger.info(character)
    return character
  }
  return null
}

export const addCharacter = async (c) => {
  const { error } = charSchema.validate(c)
  if (error) {
    return error
  }

  const id = await db('characters').insert({
    ...c,
    created_at: new Date(),
    updated_at: new Date(),
  })
  const character = await getCharacterById(id[0])
  return character
}

export const deleteCharacter = async (id) => {
  await db('characters').where({ id }).del()
  const characters = await getAllCharacters()
  return characters
}

export const updateCharacter = async (id, c) => {
  const { error } = charSchema.validate(c)
  if (error) {
    logger.error(error)
    return { error: error.details[0].message }
  }
  // this you need to use the c data instead of the
  // name and description from the commented out line below
  const { name, description } = c
  let character = await getCharacterById(id)
  if (character) {
    // const { name, description } = character
    // you were basically trying to update that entry
    // with the data that was already in the db
    await db('characters')
      .where({ id })
      .update({ name, description, updated_at: Date.now() })
    character = await getCharacterById(id)
    return character
  }
  return character
}

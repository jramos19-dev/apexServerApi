import { nanoid } from 'nanoid'
import joi from 'joi'

const tipsSchema = joi.object({
  title: joi.string().required().min(3),
  character: joi.string().required().min(4),
  content: joi.string().required().min(15),
})

const charSchema = joi.object({
  name: joi.string().required().min(3),
  prescription: joi.string().required().min(4),
})

let tips = []
let characters = []

const tip = {
  id: 'randomid',
  title: 'tip title',
  character: 'tip character',
  content: 'the content of the tip is the actual tip ',
}

const character = {
  id: 1,
  name: 'octane',
  description: 'a brief description of the character',
}

tips.push(tip)
characters.push(character)

// tip functions
export const getAllTips = () => tips

export const getTipById = (id) => {
  return tips.find((t) => t.id === id)
}

export const addTip = (t) => {
  const { error } = tipsSchema.validate(t)
  if (error) {
    return error
  }

  const id = nanoid()
  tips.push({ id, ...t })
  return getTipById(id)
}

export const deleteTip = (id) => {
  tips = tips.filter((t) => t.id !== id)
  return tips
}

export const updateTip = (id, t) => {
  let dbTip = getTipById(id)
  if (dbTip) {
    dbTip = { ...dbTip, ...t }
    deleteTip(id)
    addTip(dbTip)
    return dbTip
  }
  return null
}

// character functions
export const getAllCharacters = () => characters

export const getCharacterByName = (name) => {
  return characters.find((c) => c.name === name)
}

export const getCharacterById = (id) => {
  return characters.find((c) => c.id === id)
}

export const addCharacter = (c) => {
  const { error } = charSchema.validate(c)
  if (error) {
    return error
  }
  const id = nanoid()
  characters.push({ id, ...c })
  return getCharacterById(id)
}

export const deleteCharacter = (name) => {
  characters = characters.filter((c) => c.name !== name)
  return characters
}

export const updateCharacter = (name, c) => {
  let dbChar = getCharacterByName(name)
  if (dbChar) {
    dbChar = { ...dbChar, ...c }
    deleteCharacter(name)
    addCharacter(dbChar)
    return dbChar
  }
  return null
}

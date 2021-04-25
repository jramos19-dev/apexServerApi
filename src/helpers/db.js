import nanoid from 'nanoid'

const tips = []
const characters = []

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
  const id = nanoid()
  tips.push({ id, ...t })
  return getTipById(id)
}
export const updateTip = (id, t) => {
  const dbTip = getTipById(id)
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
  const id = nanoid()
  characters.push({ id, ...c })
  return getCharacterById(id)
}

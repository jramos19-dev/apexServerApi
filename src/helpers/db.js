import knex from 'knex'

// setting up actual db

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: 'db.sqlite',
  },
  useNullAsDefault: true,
})

const createTables = async () => {
  const tipsTableExists = await db.schema.hasTable('tips')
  const charTableExists = await db.schema.hasTable('characters')

  if (!tipsTableExists) {
    await db.schema.createTable('tips', (table) => {
      table.increments('id').primary()
      table.string('title')
      table.string('character')
      table.integer('charId')
      table.string('content')
      table.timestamps()
    })
  }
  if (!charTableExists) {
    await db.schema.createTable('characters', (table) => {
      table.increments('id').primary()
      table.string('name')
      table.string('description')
      table.timestamps()
    })
  }
}

createTables()
export default db

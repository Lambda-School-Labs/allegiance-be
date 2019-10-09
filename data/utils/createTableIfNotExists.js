async function createTableIfNotExist(knex, createsTable) {
  let table = createsTable.name.split('create')[1].toLowerCase()
  await knex.schema.hasTable(table).then(exist => {
    if (!exist) {
      return knex.schema.createTable(table, createsTable)
    }
  })
}

module.exports = createTableIfNotExist

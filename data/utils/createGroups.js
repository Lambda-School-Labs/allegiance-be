function createGroups(tbl) {
  tbl.increments()
  tbl.string('name', 50).notNullable()
  tbl.string('type').notNullable()
  tbl.string('state')
  tbl.string('country')
  tbl.string('city')
  tbl.string('zip')
  tbl.string('image')
  tbl.string('acronym', 4)
  tbl.string('description')
  tbl
    .integer('allegiance_id')
    .unsigned()
    .references('id')
    .inTable('allegiances')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
  tbl
    .integer('creator_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
  tbl.timestamps(true, true)
}
module.exports = createGroups

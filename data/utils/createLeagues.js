function createLeagues(tbl) {
  tbl.increments()
  tbl.string('name')
  tbl
    .integer('sport_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('sports')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
  tbl.string('acronym')
  tbl.timestamps(true, true)
}
module.exports = createLeagues

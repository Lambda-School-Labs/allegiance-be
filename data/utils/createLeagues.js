function createLeagues(tbl) {
  tbl.increments()
  tbl.string('name')
  tbl
    .integer('sport_id')
    .unsigned()
    .nullable()
    .references('id')
    .inTable('sports')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')

  tbl.string('acronym')
  tbl.timestamps(true, true)
}
module.exports = createLeagues

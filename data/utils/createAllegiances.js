function createAllegiances(tbl) {
  tbl.increments()
  tbl.string('name').notNullable()
  tbl.string('image')
  tbl.string('banner_image')
  tbl
    .integer('league_id')
    .unsigned()
    .references('id')
    .inTable('leagues')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
  tbl
    .integer('sport_id')
    .notNullable()
    .unsigned()
    .references('id')
    .inTable('sports')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
  tbl.timestamps(true, true)
}

module.exports = createAllegiances

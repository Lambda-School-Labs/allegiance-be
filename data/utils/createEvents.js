function createEvents(tbl) {
  tbl.increments()
  tbl.string('name')
  tbl.text('description')
  tbl.string('address')
  tbl.string('city')
  tbl.integer('zip')
  tbl.date('startTime')
  tbl.date('endTime')
  tbl
    .integer('organizer')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
  tbl
    .integer('group_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('groups')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
  tbl.timestamps(true, true)
}
module.exports = createEvents

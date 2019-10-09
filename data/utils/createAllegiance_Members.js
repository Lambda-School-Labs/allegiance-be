function createAllegiance_Members(tbl) {
  tbl.increments()

  tbl
    .integer('user_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')

  tbl
    .integer('allegiance_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('allegiances')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')

  tbl.unique(['user_id', 'allegiance_id'])
}
module.exports = createAllegiance_Members

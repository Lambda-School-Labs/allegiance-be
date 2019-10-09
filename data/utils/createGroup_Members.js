function createGroup_Members(tbl) {
  tbl.increments()
  tbl
    .integer('user_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
  tbl.boolean('user_type')
  tbl
    .integer('group_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('groups')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
  tbl.timestamps(true, true)
  tbl.unique(['user_id', 'group_id'])
}
module.exports = createGroup_Members

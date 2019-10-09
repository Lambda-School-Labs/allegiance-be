function createPosts(tbl) {
  tbl.increments()
  tbl.string('title').notNullable()

  tbl.text('content').notNullable()
  tbl
    .integer('group_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('groups')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
  tbl
    .integer('user_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
  tbl.timestamps(true, true)
}
module.exports = createPosts

function createComments(tbl) {
  tbl.increments()
  tbl.text('content').notNullable()
  tbl
    .integer('post_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('posts')
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
module.exports = createComments

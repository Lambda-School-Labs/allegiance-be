const createTableIfNotExist = require('../utils/createTableIfNotExists')
const helpers = require('../utils')
exports.up = function(knex) {
  return Promise.all([
    createTableIfNotExist(knex, helpers.createSports),
    createTableIfNotExist(knex, helpers.createLeagues),
    createTableIfNotExist(knex, helpers.createAllegiances),
    createTableIfNotExist(knex, helpers.createGroups),
    createTableIfNotExist(knex, helpers.createLikes),
    createTableIfNotExist(knex, helpers.createPosts),
    createTableIfNotExist(knex, helpers.createGroup_Members),
    createTableIfNotExist(knex, helpers.createAllegiance_Members),
    createTableIfNotExist(knex, helpers.createComments),
    createTableIfNotExist(knex, helpers.createEvents),
    createTableIfNotExist(knex, helpers.createImages),
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists('images'),
    knex.schema.dropTableIfExists('events'),
    knex.schema.dropTableIfExists('comments'),
    knex.schema.dropTableIfExists('allegiance_members'),
    knex.schema.dropTableIfExists('group_members'),
    knex.schema.dropTableIfExists('posts'),
    knex.schema.dropTableIfExists('likes'),
    knex.schema.dropTableIfExists('groups'),
    knex.schema.dropTableIfExists('allegiances'),
    knex.schema.dropTableIfExists('leagues'),
    knex.schema.dropTableIfExists('sports'),
  ])
}

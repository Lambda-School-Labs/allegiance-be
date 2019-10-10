const f = require('../seedHelpers')
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sports')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('sports')
        .insert(f.createSportsSeeds)
        .then(() => {
          return knex('leagues').insert(f.createLeaguesSeeds)
        })
        .then(() => {
          return knex('allegiances').insert(f.createAllegiancesSeeds)
        })
        .then(() => {
          return knex('users').insert(f.createUsersSeeds)
        })
        .then(() => {
          return knex('groups').insert(f.createGroupsSeeds)
        })
        .then(() => {
          return knex('group_members').insert(f.createGroupMembersSeeds)
        })
        .then(() => {
          return knex('posts').insert(f.createPostsSeeds)
        })
    })
}

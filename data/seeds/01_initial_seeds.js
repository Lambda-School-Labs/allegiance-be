const f = require('../seedHelpers')
exports.seed = async function(knex) {
  return Promise.all([
    await knex('sports').insert(f.createSportsSeeds),
    await knex('leagues').insert(f.createLeaguesSeeds),
    await knex('allegiances').insert(f.createAllegiancesSeeds),
    await knex('users').insert(f.createUsersSeeds),
    await knex('groups').insert(f.createGroupsSeeds),
    await knex('group_members').insert(f.createGroupMembersSeeds),
    await knex('posts').insert(f.createPostsSeeds),
  ])
}

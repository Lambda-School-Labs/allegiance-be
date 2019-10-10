const allegiances = require('../utils/createAllegianceSeeds')
const allegianceMembers = require('../utils/createAllegianceMembersSeeds')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('allegiances')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('allegiances').insert(allegiances)
    })
}

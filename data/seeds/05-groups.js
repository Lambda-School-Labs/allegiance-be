const groups = require('../utils/createGroupSeeds')
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('groups')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('groups').insert(groups)
    })
}

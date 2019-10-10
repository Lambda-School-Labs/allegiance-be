const faker = require('faker')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('group_members')
    .del()
    .then(() => {
      // Creates unified created/updated at dates for groups
      function dates() {
        date = faker.date.past()
        return { created_at: date, updated_at: date }
      }
      // Inserts seed entries
      return knex('group_members').insert([
        {
          id: 1,
          user_id: 1,
          user_type: 'admin',
          group_id: 1,
        },
        {
          id: 2,
          user_id: 1,
          user_type: 'admin',
          group_id: 2,
        },
      ])
    })
}

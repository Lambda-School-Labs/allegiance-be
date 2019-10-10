exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sports')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('sports').insert([
        { id: 1, name: 'soccer' },
        { id: 2, name: 'football' },
        { id: 3, name: 'hockey' },
        { id: 4, name: 'tennis' },
        { id: 5, name: 'basketball' },
        { id: 6, name: 'baseball' },
      ])
    })
}

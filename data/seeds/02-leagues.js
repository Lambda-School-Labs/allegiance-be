exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('leagues')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('leagues').insert([
        { id: 1, name: 'Major League Soccer', acronym: 'MLS', sport_id: 1 },
        {
          id: 2,
          name: 'National Football League',
          acronym: 'NFL',
          sport_id: 2,
        },
        { id: 3, name: 'National Hockey League', acronym: 'NHL', sport_id: 3 },
        { id: 4, name: 'National Tennis Leagues', acronym: 'NTL', sport_id: 4 },
        {
          id: 5,
          name: 'Nationa Basketball Association',
          acronym: 'NBA',
          sport_id: 5,
        },
        { id: 6, name: 'Major League Baseball', acronym: 'MLB', sport_id: 6 },
      ])
    })
}

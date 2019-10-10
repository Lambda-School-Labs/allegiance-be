exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('posts').insert([
        {
          id: 1,
          user_id: 1,
          group_id: 1,
          content: 'This is a post',
          title: 'YESTERDAYS DISAPPOINTMENT ....',
        },
      ])
    })
}

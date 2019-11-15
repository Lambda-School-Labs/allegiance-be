const faker = require("faker");

const createFakePosts = () => ({
  user_id: Math.floor(Math.random() * 50),
  group_id: Math.floor(Math.random() * 50),
  post_content: faker.name.firstName(),
});

exports.seed = async function(knex, Promise) {
  const fakePosts = [];
  const count = 10;
  for (let i = 1; i < count; i++) {
    fakePosts.push(createFakePosts());
  }

  return knex("posts").insert(fakePosts);
};

const faker = require("faker");

const createFakeUser = () => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  location: faker.address.zipCode("#####"),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  bio: faker.lorem.sentences(),
  image: faker.image.avatar(),
});
exports.seed = async function(knex, Promise) {
  const fakeUsers = [];
  const count = 50;
  for (let i = 1; i < count; i++) {
    fakeUsers.push(createFakeUser());
  }
  fakeUsers.push({
    email: "labsallegiance@gmail.com",
    username: "test",
  });
  return knex("users").insert(fakeUsers);
};

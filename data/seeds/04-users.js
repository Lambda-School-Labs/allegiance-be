const faker = require('faker')

const createFakeUser = id => ({
  id,
  username: faker.internet.userName(),
  email: faker.internet.email(),
  location: faker.address.zipCode('#####'),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  bio: faker.lorem.sentences(),
})
exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  // Inserts seed entries
  const fakeUsers = []
  const count = 50
  for (let i = 1; i < count; i++) {
    fakeUsers.push(createFakeUser(i))
  }
  fakeUsers.push({
    id: 50,
    email: 'labsallegiance@gmail.com',
  })
  await knex('leagues').del()
  const users = await knex('users').insert(fakeUsers)
  return users
}

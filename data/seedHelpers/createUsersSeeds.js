const faker = require('faker')
const users = []
const createFakeUser = id => ({
  id,
  username: faker.internet.userName(),
  email: faker.internet.email(),
  location: faker.address.zipCode('#####'),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  bio: faker.lorem.sentences(),
})

for (let i = 1; i < 50; i++) {
  users.push(createFakeUser(i))
}
module.exports = users

const faker = require("faker");

const createFakeGroup = () => ({
  // maybe not .sentences
  group_name: faker.commerce.productName(),
  privacy_setting: "public",
  location: faker.address.zipCode("#####"),
  creator_id: "5",
  image: `${faker.image.nature()}?random=${Date.now()}`,
  acronym: "SEED",
  description: faker.company.catchPhraseDescriptor(),
});

exports.seed = async function(knex, Promise) {
  const fakeGroups = [];
  const count = 50;
  for (let i = 1; i < count; i++) {
    fakeGroups.push(createFakeGroup());
  }

  return knex("groups").insert(fakeGroups);
};

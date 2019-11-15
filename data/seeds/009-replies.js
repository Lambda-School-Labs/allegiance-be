exports.seed = function(knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex("replies").insert();
};

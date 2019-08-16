exports.up = function(knex) {
  return knex.schema.createTable("groups", groups => {
    groups.increments();

    groups.string("group_name").notNullable();
    groups.string("privacy_setting").notNullable();
    groups
      .integer("location")
      .notNullable()
      .comment("This is the location field");
    groups
      .integer("creator_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    groups.string("image", 999);
    groups.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("groups");
};

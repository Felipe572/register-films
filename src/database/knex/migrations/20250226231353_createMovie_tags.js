exports.up = knex => knex.schema.createTable("movie_tags", table => {
    table.increments("id");
    table.integer("note_id").references("id").inTable("movieNotes").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");
    table.text("name").notNullable;
});

exports.down = knex => knex.schema.dropTable("movie_tags");

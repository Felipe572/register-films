exports.up = knex => knex.schema.createTable("movieNotes", table => {
    table.increments("id");
    table.text("title");
    table.text("description");
    table.interger("rating");
    table.interger("user_id").reference("id").inTable("users");
    
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("update_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("movieNotes");

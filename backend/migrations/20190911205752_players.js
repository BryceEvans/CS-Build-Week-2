
exports.up = function(knex) {
  return knex.schema.createTable('players', function(table) {

        table.increments();
        table
            .string('playerID')
            .notNullable()
            .unique();
        table
            .text('name')
            .notNullable()
            .unique();
        table
            .float('cooldown');
        table
            .integer('encumbrance')
        table
            .integer('strength')
        table
            .integer('speed')
        table
            .specificType('wearing', 'text ARRAY');
        table
            .integer('gold')
        table
            .text('mining')
        table
            .specificType('inventory', 'text ARRAY');
        table
            .specificType('status', 'text ARRAY');
        table
            .specificType('errors', 'text ARRAY');
        table 
            .specificType('messages', 'text ARRAY');

        table
            .timestamp('created_at').defaultTo(knex.fn.now());
        table
            .timestamp('updated_at').defaultTo(knex.fn.now());
});
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("players");
  };
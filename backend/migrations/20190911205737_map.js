
exports.up = function(knex) {
    return knex.schema.createTable('players', function(table) {

        table.increments();
        table
            .integer('room_id');
        table
            .text('title');
        table
            .text('description');
        table
            .specificType('coordinates', 'integer ARRAY');
        table
            .json("exits");
        table
            .integer('elevation');
        table
            .text('terrain');
        table
            .float("cooldown");
        table
            .specificType('errors', 'text ARRAY');
        table
            .specificType('messages', 'text ARRAY');
    });
}


exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("map");
  };
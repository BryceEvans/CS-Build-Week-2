
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('players').del()
    .then(function () {
      // Inserts seed entries
      return knex('players').insert([
        {playerID: '3c0bafec5baddbb3fa7a8ca7c72c2b9b3b3062a9', name: "player196", cooldown: 1.0, encumbrance: 0, strength: 10, speed: 10, wearing: [], gold: 0, inventory: [], status: [], mining: "no", errors: [], messages: []}
      ]);
    });
};

create table "players"
("id" serial primary key,
"playerID" varchar(255) not null,
"name" text not null, "cooldown" real, "encumbrance" integer,
"strength" integer, "speed" integer, "wearing" text ARRAY,
"gold" integer, "mining" text, "inventory" text ARRAY, "status" text ARRAY,
"errors" text ARRAY, "messages" text ARRAY,
"created_at" timestamptz default CURRENT_TIMESTAMP,
"updated_at" timestamptz default CURRENT_TIMESTAMP)


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('categories').insert([
        { categoryName: 'Glutes', userId: 1 },
        { categoryName: 'Arms', userId: 1 },
        { categoryName: 'Abs', userId: 1 },
        { categoryName: 'Cardio', userId: 1 },
        { categoryName: 'HiiT', userId: 1 }
      ]);
    });
};

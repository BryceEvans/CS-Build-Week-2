create table "players"
("id" serial primary key,
"playerID" varchar(255) not null,
"name" text not null, "cooldown" real, "encumbrance" integer,
"strength" integer, "speed" integer, "wearing" text ARRAY,
"gold" integer, "mining" text, "inventory" text ARRAY, "status" text ARRAY,
"errors" text ARRAY, "messages" text ARRAY,
"created_at" timestamptz default CURRENT_TIMESTAMP,
"updated_at" timestamptz default CURRENT_TIMESTAMP)
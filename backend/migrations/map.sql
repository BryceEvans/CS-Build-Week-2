create table "map"
("id" serial primary key,
"room_id" integer not null,
"title" text not null,
"description" text, 
"coordinates" integer ARRAY,
"exits" jsonb not null,
"elevation" integer,
"terrain" text,
"cooldown" real,
"errors" text ARRAY,
"messages" text ARRAY,
"created_at" timestamptz default CURRENT_TIMESTAMP,
"updated_at" timestamptz default CURRENT_TIMESTAMP)

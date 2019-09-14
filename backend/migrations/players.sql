create table "players"
("id" serial primary key,
"playerID" varchar(255) not null,
"name" text not null, "cooldown" real, "encumbrance" integer,
"strength" integer, "speed" integer, "wearing" text ARRAY,
"gold" integer, "mining" text, "inventory" text ARRAY, "status" text ARRAY,
"errors" text ARRAY, "messages" text ARRAY,
"created_at" timestamptz default CURRENT_TIMESTAMP,
"updated_at" timestamptz default CURRENT_TIMESTAMP)


curl -X POST -H 'Authorization: Token 3c0bafec5baddbb3fa7a8ca7c72c2b9b3b3062a9' -H "Content-Type: application/json" -d '{"direction":"n"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/move

curl -X GET -H 'Authorization: Token 3c0bafec5baddbb3fa7a8ca7c72c2b9b3b3062a9' https://lambda-treasure-hunt.herokuapp.com/api/adv/init/

curl -X POST -H 'Authorization: Token 3c0bafec5baddbb3fa7a8ca7c72c2b9b3b3062a9' -H "Content-Type: application/json" https://lambda-treasure-hunt.herokuapp.com/api/adv/status/
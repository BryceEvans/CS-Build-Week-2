const express = require('express');
const server = express();
// const db = require('./data/dbHelpers');
const cors = require('cors');
const axios = require('axios');

// -------- Pseudo DB until static db is created ----------

class Room {
  constructor(room_id, title, coordinates, items, exits, cooldown) {
    this.room_id = room_id;
    this.title = title;
    this.coordinates = coordinates;
    this.items = items;
    this.exits = exits;
    this.cooldown = cooldown;
  }
}

class MapNode {
  constructor(room_id, coordinates, exits) {
    (this.room_id = room_id),
      (this.coordinates = coordinates),
      (this.exits = exits);
  }
}

server.use(express.json(), cors());

const PORT = 5050;

const getUrl = 'https://lambda-treasure-hunt.herokuapp.com/api/adv/init/';
const moveUrl = 'https://lambda-treasure-hunt.herokuapp.com/api/adv/move/';
// // Uncomment These as you need them...
const takeUrl = 'https://lambda-treasure-hunt.herokuapp.com/api/adv/take/';
const dropUrl = 'https://lambda-treasure-hunt.herokuapp.com/api/adv/drop/';
const sellUrl = 'https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/';
const statusUrl = 'https://lambda-treasure-hunt.herokuapp.com/api/adv/status/';
const examineUrl =
  'https://lambda-treasure-hunt.herokuapp.com/api/adv/examine/';
// const wearUrl = 'https://lambda-treasure-hunt.herokuapp.com/api/adv/wear/';
// const changeNameUrl = 'https://lambda-treasure-hunt.herokuapp.com/api/adv/change_name/';
// const prayUrl = 'https://lambda-treasure-hunt.herokuapp.com/api/adv/pray/';
// const flyUrl = 'https://lambda-treasure-hunt.herokuapp.com/api/adv/fly/';
// const dashUrl = 'https://lambda-treasure-hunt.herokuapp.com/api/adv/dash/';
// const carryUrl = 'https://lambda-treasure-hunt.herokuapp.com/api/adv/carry/';
// const receiveUrl = 'https://lambda-treasure-hunt.herokuapp.com/api/adv/receive/';
// const mineUrl = 'https://lambda-treasure-hunt.herokuapp.com/api/bc/mine/';
// const proofUrl = 'https://lambda-treasure-hunt.herokuapp.com/api/bc/last_proof/';
// const balanceUrl = 'https://lambda-treasure-hunt.herokuapp.com/api/bc/get_balance/';
// const transmorgrifyUrl = 'https://lambda-treasure-hunt.herokuapp.com/api/adv/transmogrify/';
const params = {
  // // K-token
  TOKEN: '65ef3fd1d9226f97f50a440cb4dd09b64e0d6a8c'
  // // B-token
  // TOKEN: '75578be1cf6136d88fb6b170e43b7da71dea5f84'
};
let map = {};
var stack = [];
var prevRoom = 0;
var coolDown = 1;
let currentRoom = null;

async function getRoom() {
  let timeOut = 1;
  const config = {
    method: 'get',
    url: getUrl,
    headers: {
      Authorization: `Token ${params.TOKEN}`
    }
  };
  await axios(config)
    .then(res => {
      prevRoom = res.data.room_id;
      if (!map[res.data.room_id]) {
        let exits = {};
        res.data.exits.map(exit => {
          exits[exit] = '?';
        });
        let coords = res.data.coordinates;
        let info = [];
        info.push(coords, exits);
        map[res.data.room_id] = info;
        console.log('Map in getRoom', map);
      }
      currentRoom = res.data.room_id;
      console.log(currentRoom);
      const room = new Room(
        res.data.room_id,
        res.data.title,
        res.data.coordinates,
        res.data.items,
        res.data.exits,
        res.data.cooldown
      );
      timeOut = res.data.cooldown;
      stack.push(room);
    })
    .catch(err => console.log(err));
}
// MOVE function that takes in a direction then pushes map information into map variable.
async function move(moveDirection) {
  let oppositeDirection = { n: 's', s: 'n', e: 'w', w: 'e' };
  let timeOut = 1;
  const config = {
    method: 'post',
    url: moveUrl,
    headers: {
      Authorization: `Token ${params.TOKEN}`
    },
    body: {
      direction: moveDirection
    }
  };
  await axios({
    method: config.method,
    url: moveUrl,
    data: config.body,
    headers: config.headers
  })
    .then(res => {
      timeOut = res.data.cooldown;
      // Checking to see if room is in the map already
      if (!map[res.data.room_id]) {
        let exits = {};
        // map all exits with '?'
        res.data.exits.map(exit => {
          exits[exit] = '?';
        });
        // sets the exit from the opposite of moveDirection to be prevRoom
        exits[oppositeDirection[moveDirection]] = prevRoom;
        prevRoom = res.data.room_id;
        let coords = res.data.coordinates;
        let info = [];
        info.push(coords, exits);
        map[res.data.room_id] = info;
      }
      console.log('Map from move', map);
    })
    .catch(err => console.log(err));
}

async function take() {
  const config = {
    method: 'post',
    url: takeUrl,
    headers: {
      Authorization: `Token ${params.TOKEN}`
    },
    body: {
      name: 'treasure'
    }
  };
  await axios({
    method: config.method,
    url: takeUrl,
    data: config.body,
    headers: config.headers
  })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
}

async function drop() {
  const config = {
    method: 'post',
    url: dropUrl,
    headers: {
      Authorization: `Token ${params.TOKEN}`
    },
    body: {
      name: 'treasure'
    }
  };
  await axios({
    method: config.method,
    url: dropUrl,
    data: config.body,
    headers: config.headers
  })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
}

async function sell() {
  const config = {
    method: 'post',
    url: sellUrl,
    headers: {
      Authorization: `Token ${params.TOKEN}`
    },
    body: {
      name: 'treasure'
    }
  };
  await axios({
    method: config.method,
    url: sellUrl,
    data: config.body,
    headers: config.headers
  })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
}

async function confirmSell() {
  const config = {
    method: 'post',
    url: sellUrl,
    headers: {
      Authorization: `Token ${params.TOKEN}`
    },
    body: {
      name: 'treasure',
      confirm: 'yes'
    }
  };
  await axios({
    method: config.method,
    url: sellUrl,
    data: config.body,
    headers: config.headers
  })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
}

async function status() {
  const config = {
    method: 'post',
    url: statusUrl,
    headers: {
      Authorization: `Token ${params.TOKEN}`
    }
  };
  await axios({
    method: config.method,
    url: statusUrl,
    headers: config.headers
  })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
}

async function examine() {
  const config = {
    method: 'post',
    url: examineUrl,
    headers: {
      Authorization: `Token ${params.TOKEN}`
    },
    body: {
      name: 'treasure'
    }
  };
  await axios({
    method: config.method,
    url: examineUrl,
    data: config.body,
    headers: config.headers
  })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
}

// ALGORITHM

getRoom();
move('n');
console.log('current room ', currentRoom);
console.log('map at current room', map[currentRoom]);
//while(map.length < 500){
if (map[currentRoom]) {
  console.log('working');
  // for (exit in map[currentRoom][1]) console.log('Exits in current room', exit);
}
console.log('map', map);

//}

// getRoom();
// //move();
// //move('n');
// move('s');
// move('s')

// take();
// drop();
// sell();
// confirmSell();
// status();
// examine();

server.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}`);
});

const express = require('express');
const server = express();
const bodyParser = require('body-parser');

const db = require('./dbConfig');
const cors = require('cors');
const axios = require('axios');
const { Client } = require('pg');

server.use(cors());
server.use(express.json());
server.use(bodyParser())

server.get('/players', (req, res) => {
  db.select()
    .from('players')
    .then(players => {
      res.send(players);
    });
});

server.get('/players/:playerID', (req, res) => {
  db.select()
    .from('players')
    .where('playerID', req.params.playerID)
    .then(players => {
      res.send(players);
    });
});

server.get('/map', (req, res) => {
  db.select()
    .from('map')
    .then(map => {
      res.send(map);
    });
});

server.get('/map:room_id', (req, res) => {
  db.select()
    .from('map')
    .where('room_id', req.params.room_id)
    .then(map => {
      res.send(map);
    });
});

server.post('/players', (req, res) => {
  db('players')
    .insert(req.body)
    .then(() => {
      db.select()
        .from('players')
        .then(players => {
          res.send(players);
        });
    });
});

server.post('/map', (req, res) => {
  db('map')
    .insert(req.body)
    .then(() => {
      db.select()
        .from('map')
        .then(map => {
          res.send(map);
        });
    });
});

server.put('/players/update/:playerID', (req, res) => {
  db.select()
    .from('players')
    .where('playerID', req.params.playerID)
    .update(req.body)
    .then(players => {
      db.select()
        .from('players')
        .where('playerID', req.params.playerID)
        .then(players => {
          res.send(players);
        });
    });
});

server.put('/map/update/:room_id', (req, res) => {
  db.select()
    .from('map')
    .where('room_id', req.params.room_id)
    .update(req.body)
    .then(map => {
      db.select()
        .from('map')
        .where('room_id', req.params.room_id)
        .then(map => {
          res.send(map);
        });
    });
});

let treasureMap = {};
let completeMap = [];
// -------- Pseudo DB until static db is created ----------

class Room {
  constructor(room_id, title, coordinates, items, exits, cooldown) {
    this.room_id = room_id;
    this.title = title;
    this.coordinates = [
      Number(coordinates.replace(/[(](\d+)\s?[,]\s?(\d+)[)]/, '$1')),
      Number(coordinates.replace(/[(](\d+)\s?[,]\s?(\d+)[)]/, '$2'))
    ];
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
  // B-token
  // TOKEN: '75578be1cf6136d88fb6b170e43b7da71dea5f84'
};

function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

// let map = {};
// var stack = [];
// var prevRoom = 0;
var coolDown = 1;
// let currentRoom = null;

let inverseDirections = { n: 's', s: 'n', e: 'w', w: 'e' };
let rooms = {};
let reversePath = [];
let roomsDict = {};
let roomsCollection = {};

function createRoom(res) {
  const room = new Room(
    res.data.room_id,
    res.data.title,
    res.data.coordinates,
    res.data.items,
    res.data.exits,
    res.data.cooldown
  );
  return room;
}

async function getData() {
  const config = {
    method: 'get',
    url: getUrl,
    headers: {
      Authorization: `Token ${params.TOKEN}`
    }
  };
  let getRoomData = await Promise.resolve(
    axios(config)
      .then(res => {
        let room = createRoom(res);
        wait(res.data.cooldown * 1010);
        return room;
      })
      .catch(err => console.log('GetDataError: ', err))
  );
  completeMap.push(getRoomData);
  return getRoomData;
}

async function move(moveDirection) {
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
  let moveRoomData = await Promise.resolve(
    axios({
      method: config.method,
      url: moveUrl,
      data: config.body,
      headers: config.headers
    })
      .then(res => {
        let room = createRoom(res);
        wait(res.data.cooldown * 1010);
        return room;
      })
      .catch(err => {
        console.log('Move Error: ', err);
      })
  );
  return moveRoomData;
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
      wait(res.data.cooldown * 1010);
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
      wait(res.data.cooldown * 1010);
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
      wait(res.data.cooldown * 1010);
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
      wait(res.data.cooldown * 1010);
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
      wait(res.data.cooldown * 1010);
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
      wait(res.data.cooldown * 1010);
    })
    .catch(err => console.log(err));
}

function add_room(r, map) {
  console.log('Brrrrrr', completeMap[completeMap.length - 1]);
  map[r.room_id] = {};
  let directions = Object.keys(r.exits);
  for (let i = 0; i < r.exits.length; i++) {
    map[r.room_id][r.exits[i]] = '?';
  }
}

// async function explore_final() {
//   let depth = [];
//   let visited = [];
//   let starting_room = await getData();
//   let traversalPath = [];

//   add_room(starting_room, treasureMap);

//   /* """
//     #     Print each vertex in depth-first order
//     #     beginning from starting_vertex.
//     #     """
//     */
//   depth.push(starting_room);
//   let unexplored_room = null;
//   wait(starting_room.cooldown * 1010);
//   while (Object.keys(treasureMap).length < 2) {
//     let current_room = await getData();

//     console.log(`current room is ${current_room.room_id}`);
//     console.log(
//       `treasureMap ${(Object.keys(treasureMap).length / 500) * 100}%  ${
//         Object.keys(treasureMap).length
//       }`
//     );
//     wait(current_room.cooldown * 1000);
//     if (!(current_room.room_id in treasureMap)) {
//       add_room(current_room, treasureMap);
//     }

//     let nextDirection = null;

//     let prevDirection = [...traversalPath].pop();

//     // # if we haven't treasureMap_final this room yet, mark it as treasureMap_final

//     // # pick a random exit from the current room

//     if (treasureMap[current_room.room_id][prevDirection] == '?') {
//       nextDirection = prevDirection;
//     } else {
//       for (direction in treasureMap[current_room.room_id]) {
//         if (treasureMap[current_room.room_id][direction] == '?') {
//           console.log('direction, is it really?', direction);
//           nextDirection = direction;
//           break;
//         }
//       }
//     }

//     if (nextDirection === null) {
//       backtrackDirection = depth.pop();
//       await move(backtrackDirection);
//       traversalPath.push(backtrackDirection);
//     }
//     // # room is fully explored, backtrack
//     else {
//       await move(nextDirection);
//       traversalPath.push(nextDirection);
//       depth.push(inverseDirections[nextDirection]);
//       let room = await getData();
//       console.log('roomy', room);
//       treasureMap[current_room.room_id][nextDirection] = room.room_id;
//       if (!Object.values(treasureMap[current_room.room_id]).includes('?')) {
//         completeMap.filter(place => place.room_id)[0].exits =
//           treasureMap[current_room.room_id];
//       }
//     }
//     // # travel in the selected direction

//     // print('ending', len(questions), room )

//     // print('END', traversalPath)
//   }

//   for (let [key, value] of Object.entries(traversalPath)) {
//     for (let i = 0; i < completeMap.length; i++) {
//       if (completeMap[i].room_id === key) {
//         completeMap[i].exits = value;
//       }
//     }
//   }
// }

// explore_final().then(res => {
//   console.log(treasureMap, 'length is', treasureMap.length);
//   return res;
// });

// def proof_of_work(last_proof):
//     """
//     Simple Proof of Work Algorithm
//     Find a number p such that hash(last_block_string, p) contains 6 leading
//     zeroes
//     """

//     print("Start work on a new proof")
//     proof = 0

//     # for block 1, hash(1, p) = 000000x

//     while not valid_proof(last_proof, proof) :
//         proof += 1
//     print("Attempting to mine")
//     return proof

// def valid_proof(last_proof, proof):
//     """
//     Validates the Proof:  Does hash(block_string, proof) contain 6
//     leading zeroes?
//     """
//     # build string to hash
//     guess = f'{last_proof}{proof}'.encode()
//     # use hash function
//     guess_hash = hashlib.sha256(guess).hexdigest()
//     #check if 6 leading 0's in hash result
//     beg = guess_hash[0:6] # [:6]
//     if beg == "000000":
//         return True
//     else:
//         return False

server.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}`);
});

const express = require('express');
const server = express();
// const db = require('./data/dbHelpers');
const cors = require('cors');
const axios = require('axios');
let treasureMap = {}
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
  // TOKEN: '65ef3fd1d9226f97f50a440cb4dd09b64e0d6a8c'
  // B-token
  TOKEN: '75578be1cf6136d88fb6b170e43b7da71dea5f84'
};

function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

// let map = {};
// var stack = [];
// var prevRoom = 0;
// var coolDown = 1;
// let currentRoom = null;

let inverseDirections = { 'n': "s", 's': 'n', 'e': 'w', 'w': 'e' }
let rooms = {}
let reversePath = []
let roomsDict = {}
let roomsCollection = {}

function createRoom(res) {
  const room = new Room(
    res.data.room_id,
    res.data.title,
    res.data.coordinates,
    res.data.items,
    res.data.exits,
    res.data.cooldown
  ) 
  return room 
}

async function getData() {
  const config = {
      method: 'get',
      url: getUrl,
      headers: {
        Authorization: `Token ${params.TOKEN}`
      }
  }
  wait(10100)
  let getRoomData = await Promise.resolve(axios(config)
    .then(res => {
      let room = createRoom(res)
      return room
    })
    .catch(err => console.log("GetDataError: ", err))
  )
  return getRoomData  
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
  }
  wait(10100)
  let moveRoomData = await Promise.resolve(axios({
    method: config.method,
    url: moveUrl,
    data: config.body,
    headers: config.headers
  })
    .then(res => {
      let room = createRoom(res)
      return room
    })
    .catch(err => { console.log("Move Error: ", err) })
  )
      return moveRoomData
}



// async function doWhile(roomData) {  
//     let x = roomData
    
//     console.log("RUNNING WHILE LOOP")
//     console.log("CurrentRoom: ", x)

//     if (!(x.room_id in rooms)) {

//       rooms[x.room_id] = x
//       roomsDict[x.room_id] = x

//       let lastDirection = reversePath[reversePath.length-1]

//       let indexToRemove = roomsDict[x.room_id].exits.indexOf(lastDirection);
//       if (indexToRemove > -1) {
//         roomsDict[x.room_id].exits.splice(indexToRemove, 1);
//         // console.log("T1", roomsDict[x.room_id])
//       }
//     }

//     if (roomsDict[x.room_id].exits.length < 1) {
//       let reverse = reversePath.pop()
//       traversalPath.push(reverse)
//       let nextRoom = await move(reverse)
//       doWhile(nextRoom)
//     }
    
//     if(x.room_id in rooms) {
//       x = rooms[x.room_id]
//       let exitDirection = roomsDict[x.room_id].exits.shift()
//       traversalPath.push(exitDirection)
//       reversePath.push(inverseDirections[exitDirection])
//       let nextRoom = await move(exitDirection)
//       doWhile(nextRoom)
//     }
    
    //not sure if needed
    // if(500 - rooms.length === 1) {
      //     rooms[x.room_id] = x.room_id.getRoom()
      //   }
      
    
// }
//       (async () => {
//         let roomData = await getData().then(data => { return data })
//         roomsDict[roomData.room_id] = roomData
//         rooms[roomData.room_id] = roomData
//         doWhile(roomData)
//       })()
        



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

// getRoom();
// // move('n');
// console.log('current room ', currentRoom);
// console.log('map at current room', map[currentRoom]);
// // while(map.length < 500){
// if (map[currentRoom]) {
//   console.log('working');
  // for (exit in map[currentRoom][1]) console.log('Exits in current room', exit);
// }
// console.log('map', map);

// }

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






 function add_room(r, map) {
    map[r] = {}
    r.exits.forEach(dir => map[r][dir] = "?")
 }
    

async function explore_final() {

  let depth = []
  let visited = []
  let starting_room = await getData()
  console.log(await getData())   
  let traversalPath = []



  /* """
#     Print each vertex in depth-first order
#     beginning from starting_vertex.
#     """
*/
    depth.push(starting_room)
    let unexplored_room = null

    while (Object.keys(treasureMap).length < 500) {

      let current_room = await getData()
      console.log(`current room is ${current_room.room_id}`)

      if (!(current_room.room_id in treasureMap)) {
        add_room(current_room, treasureMap)
      }

      let nextDirection = null

      let prevDirection = [...traversalPath].pop()
      console.log('prev', prevDirection)
  
        // # if we haven't treasureMap_final this room yet, mark it as treasureMap_final

        // # pick a random exit from the current room

        if (treasureMap[current_room.room_id][prevDirection] == '?')
        {
          nextDirection = prevDirection

        }
        else {
          for (direction in treasureMap[current_room.room_id]) {
            if (treasureMap[room][direction] == '?') {
              nextDirection = direction
              break
            }
          }
        }

        


        if (nextDirection === null) {
          backtrackDirection = depth.pop()
          await move(backtrackDirection)
          traversalPath.push(backtrackDirection)

        }
            // # room is fully explored, backtrack

        else {
          await move(nextDirection)
          traversalPath.push(nextDirection)
          depth.push(inverseDirections[nextDirection])
          treasureMap[current_room.room_id][nextDirection] = (await getData()).room_id
        }
            // # travel in the selected direction

        // print('ending', len(questions), room )


        // print('END', traversalPath)

}
}

explore_final().then(res => {
  console.log(treasureMap)
  return res})

server.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}`);
});

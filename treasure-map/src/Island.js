import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import './App.css';
import p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import 'p5/lib/addons/p5.sound';
import PlayerStatus from './Status'
import axios from 'axios'
import qs from 'qs'
// {
//     "room_id": 0,
//     "title": "Room 0",
//     "description": "You are standing in an empty room.",
//     "coordinates": "(60,60)",
//     "players": [],
//     "items": ["small treasure"],
//     "exits": ["n", "s", "e", "w"],
//     "cooldown": 60.0,
//     "errors": [],
//     "messages": []
//   }




class Room {
  constructor(
    room_id,
    title,
    description,
    coordinates,
    players,
    items,
    exits,
    cooldown,
    errors,
    messages
  ) {
    this.room_id = room_id;
    this.title = title;
    this.description = description;
    this.coordinates = coordinates;
    this.players = players;
    this.items = items;
    this.exits = exits;
    this.cooldown = cooldown;
    this.errors = errors;
    this.messages = messages;
  }
}



// let player1 = new Player("75578be1cf6136d88fb6b170e43b7da71dea5f84", "player188", 5.0, 7, 10, 4, [], 4444, false, 0, '', [], [], [], [])







class Island extends Component {
  constructor() {
    super();
    this.state = {
      currentRoom: '...',
      previousRoom: '...'
    };
  }

  change = roomN => {
    this.setState({ currentRoom: roomN });
  };

  sketch(p) {

    function connections() {
      let connected;
      for (let i = 0; i < knownLocations.length; i++) {
        for (let direction in knownLocations[i]["exits"] ) {
        connected = knownLocations.filter(loc => loc.room_id === knownLocations[i]["exits"][direction])[0]
        p.stroke('black');
        p.strokeWeight(10);
        p.line(
          knownLocations[i]["coordinates"][0]*65-3200,
          1999 - knownLocations[i]["coordinates"][1]*65+2900,
          connected["coordinates"][0]*65-3200,
          1999 - connected["coordinates"][1]*65+2900
        );
      }
      }
    }

    function treasureMap() {
      for (let i = 0; i < knownLocations.length; i++) {
        if (knownLocations[i].room_id === currentRoom.room_id) {
          p.stroke('white');
          p.strokeWeight(5);
          p.ellipseMode(p.RADIUS);
          p.fill('lime');
          p.circle(
            knownLocations[i].coordinates[0]*65-3200,
            1999 - knownLocations[i].coordinates[1]*65+2900,
            25
          );
        }
        else if (knownLocations[i].title === "Shop") {
          p.stroke('black');
          p.strokeWeight(5);          
          p.ellipseMode(p.RADIUS);
          p.fill('gold');
          p.circle(
            knownLocations[i].coordinates[0]*65-3200,
            1999 - knownLocations[i].coordinates[1]*65+2900,
            18
          );
        }

        else if (knownLocations[i].title === "Mt. Holloway" || knownLocations[i].title === "The Peak of Mt. Holloway") {
          p.noStroke();
          p.ellipseMode(p.RADIUS);
          p.fill('red');
          p.circle(
            knownLocations[i].coordinates[0]*65-3200,
            1999 - knownLocations[i].coordinates[1]*65+2900,
            18
          );
        }
        else if (knownLocations[i].title === "A Dark Cave") {
          p.noStroke();
          p.ellipseMode(p.RADIUS);
          p.fill('#484848');
          p.circle(
            knownLocations[i].coordinates[0]*65-3200,
            1999 - knownLocations[i].coordinates[1]*65+2900,
            18
          );
        }
        else if (knownLocations[i].title === "Pirate Ry's") {
          p.noStroke();
          p.ellipseMode(p.RADIUS);
          p.fill('aqua');
          p.circle(
            knownLocations[i].coordinates[0]*65-3200,
            1999 - knownLocations[i].coordinates[1]*65+2900,
            18
          );
        }
        else if (knownLocations[i].title !== "A misty room") {
          p.noStroke();
          p.ellipseMode(p.RADIUS);
          p.fill('white');
          p.circle(
            knownLocations[i].coordinates[0]*65-3200,
            1999 - knownLocations[i].coordinates[1]*65+2900,
            18
          );
        }

        else {
          p.stroke('black');
          p.strokeWeight(2);    
          p.ellipseMode(p.RADIUS);
          p.fill('silver');
          p.circle(
            knownLocations[i].coordinates[0]*65-3200,
            1999 - knownLocations[i].coordinates[1]*65+2900,
            18
          );
        }
      }
    }

    function words() {
      for (let i = 0; i < knownLocations.length; i++) {
        if (knownLocations[i].room_id === currentRoom.room_id) {
          p.noStroke();
          p.textSize(16);
          p.fill('black');
          p.textAlign(p.CENTER);
          p.text(
            knownLocations[i].room_id,
            knownLocations[i].coordinates[0]*65-3200,
            1999 - knownLocations[i].coordinates[1]*65+2900+5
          );
        }
        else if (knownLocations[i].title === "A Dark Cave" || knownLocations[i].title === "Mt. Holloway" || knownLocations[i].title === "The Peak of Mt. Holloway") {
          p.noStroke();
          p.textSize(16);
          p.fill('white');
          p.textAlign(p.CENTER);
          p.text(
            knownLocations[i].room_id,
            knownLocations[i].coordinates[0]*65-3200,
            1999 - knownLocations[i].coordinates[1]*65+2900+5
          );
        }
        else {
          p.noStroke();
          p.textSize(16);
          p.fill('black');
          p.textAlign(p.CENTER);
          p.text(
            knownLocations[i].room_id,
            knownLocations[i].coordinates[0]*65-3200,
            1999 - knownLocations[i].coordinates[1]*65+2900+5
          );

        }
      }

    }

    let canvas;
    let dom;
    let dom2;

    let previousRoom = '';
    let knownLocations;
  let currentRoom;
  let visitedRoutes;
  let status;

  p.preload = () => {

    p.loadJSON('http://localhost:5050/map', getInit);

  }
    p.setup = () => {
      canvas = p.createCanvas(1600, 2000);
      p.noStroke();
      dom = p.select('.hello');
      dom2 = p.select('.goodbye');

    };

    function getInit(data) {
      knownLocations = data 
      const config = {
        method: 'get',
        url: 'https://lambda-treasure-hunt.herokuapp.com/api/adv/init/',
        headers: {
          Authorization: `Token 3c0bafec5baddbb3fa7a8ca7c72c2b9b3b3062a9`
        }
      };
    axios(config)
        .then(res => {
            console.log(res.data)
        currentRoom = res.data
          console.log('status quo', currentRoom)
        })
        .catch(err => console.log('GetDataError: ', err))
      }

    function stat() {
        const config = {
            method: 'post',
            url: 'https://lambda-treasure-hunt.herokuapp.com/api/adv/status/',
            headers: {
              Authorization: `Token 3c0bafec5baddbb3fa7a8ca7c72c2b9b3b3062a9`
            }
          };
        axios(config)
            .then(res => {
            status = res.data
            })
            .catch(err => console.log('GetDataError: ', err))
    }

    function gotIt() {
      const config = {
          method: 'get',
          url: 'https://lambda-treasure-hunt.herokuapp.com/api/adv/init/',
          headers: {
            Authorization: `Token 3c0bafec5baddbb3fa7a8ca7c72c2b9b3b3062a9`
          }
        };
      axios(config)
          .then(res => {
          currentRoom = res.data
          })
          .catch(err => console.log('GetDataError: ', err))
  }

    function direction(d) {
     fetch('https://lambda-treasure-hunt.herokuapp.com/api/adv/move/', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({direction: d}), // data can be `string` or {object}!
      headers:{
        'Authorization': 'Token 3c0bafec5baddbb3fa7a8ca7c72c2b9b3b3062a9',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => currentRoom = response)
    .catch(error => console.error('Error:', error));
}

    p.draw = () => {
      p.background('tan');
      if (currentRoom !== undefined)
      {


        connections();
        treasureMap();
        words();
        dom.html(`Current Room: ${currentRoom.room_id}`);
        dom2.html(`Previous Room: ${previousRoom.room_id}`);

      }
 


      // p.noStroke();
      // p.textSize(40);
      // p.text(`previous room: ${previousRoom.room_id}`, 300, 100);
    };
    p.keyPressed = () => {
      let current = knownLocations.filter(
        room => room.room_id === currentRoom.room_id
      );

      if (
        p.keyCode === p.DOWN_ARROW &&
        current[0]['exits']['s'] !== undefined
      ) {
        previousRoom = currentRoom;
        direction("s");
      } 
      else if (
        p.keyCode === p.UP_ARROW &&
        current[0]['exits']['n'] !== undefined
      ) {
        console.log('before', 'current', currentRoom, 'prev', previousRoom)

        previousRoom = currentRoom;
        direction('n')
        console.log('current', currentRoom, 'prev', previousRoom)
        p.redraw(1);
      } else if (
        p.keyCode === p.LEFT_ARROW &&
        current[0]['exits']['w'] !== undefined
      ) {
        console.log('current', currentRoom, 'prev', previousRoom)

        previousRoom = currentRoom;
        direction('w')
        console.log('current', currentRoom, 'prev', previousRoom)

        p.redraw(1);
      } else if (
        p.keyCode === p.RIGHT_ARROW &&
        current[0]['exits']['e'] !== undefined
      ) {
        console.log('current', currentRoom, 'prev', previousRoom)
        previousRoom = currentRoom;
        direction('e')
        console.log('current', currentRoom, 'prev', previousRoom)
        p.redraw(1);
      } else {
        console.log('No direction exists!');
      }
    };

    p.myCustomRedrawAccordingToNewPropsHandler = newProps => {
      if (canvas)
        //Make sure the canvas has been created
        p.fill(newProps.color);
    };
  }

  render() {
    return (
      <div>
        <h1 className="hello">{this.state.currentRoom}</h1>
        <h1 className="goodbye">{this.state.currentRoom}</h1>

        <div className="flip">
          <PlayerStatus />
          <P5Wrapper sketch={this.sketch} color={this.state.color}></P5Wrapper>          
        </div>
      </div>
    );
  }
}

export default Island;

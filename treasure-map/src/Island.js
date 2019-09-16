import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import './App.css';
import p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import 'p5/lib/addons/p5.sound';

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

class Player {
  constructor(playerID, name, cooldown, encumbrance, strength, speed, wearing, gold, mining, currentRoom, inventory, status, errors, messages  ) {
  
    this.playerID = playerID
    this.name = name;
    this.cooldown = cooldown;
    this.encumbrance = encumbrance;
    this.strength = strength; 
    this.speed = speed;
    this.wearing = wearing;
    this.gold = gold;
    this.mining = mining;
    this.currentRoom = currentRoom
    this.inventory = inventory;
    this.status = status;
    this.errors = errors;
    this.messages = messages;
}
}

let player1 = new Player("75578be1cf6136d88fb6b170e43b7da71dea5f84", "player188", 5.0, 7, 10, 4, [], 4444, false, 0, '', [], [], [], [])







class Island extends Component {
  constructor() {
    super();
    this.state = {
      currentRoom: '0'
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
    let previousRoom = '';
    let knownLocations;
  let currentRoom;
  let visitedRoutes;

  p.preload = () => {

    p.loadJSON('http://localhost:5050/map', getInit);

  }
    p.setup = () => {
      canvas = p.createCanvas(1600, 2000);
      p.noStroke();
      dom = p.select('.hello');
    };

    function getInit(data) {
      knownLocations = data
      currentRoom = data[444]
      
    }

    p.draw = () => {
      p.background('tan');
        connections();


      // p.noStroke();
      // p.textSize(40);
      // p.text(`previous room: ${previousRoom.room_id}`, 300, 100);


      treasureMap();
      words();
      // dom.html(currentRoom.room_id);
    };

    p.keyPressed = () => {
      let current = knownLocations.filter(
        room => room.room_id === currentRoom.room_id
      );

      if (
        p.keyCode === p.DOWN_ARROW &&
        current[0]['exits']['s'] !== undefined
      ) {
        previousRoom = Object.assign(currentRoom);
        const nextRoom = knownLocations.filter(
          loc => loc.room_id === current[0]['exits']['s']
        );
        currentRoom = nextRoom[0];

        p.redraw(1);
      } else if (
        p.keyCode === p.UP_ARROW &&
        current[0]['exits']['n'] !== undefined
      ) {
        previousRoom = Object.assign(currentRoom);
        const nextRoom = knownLocations.filter(
          loc => loc.room_id === current[0]['exits']['n']
        );
        currentRoom = nextRoom[0];

        p.redraw(1);
      } else if (
        p.keyCode === p.LEFT_ARROW &&
        current[0]['exits']['w'] !== undefined
      ) {
        previousRoom = Object.assign(currentRoom);
        const nextRoom = knownLocations.filter(
          loc => loc.room_id === current[0]['exits']['w']
        );
        currentRoom = nextRoom[0];
        p.redraw(1);
      } else if (
        p.keyCode === p.RIGHT_ARROW &&
        current[0]['exits']['e'] !== undefined
      ) {
        previousRoom = Object.assign(currentRoom);
        const nextRoom = knownLocations.filter(
          loc => loc.room_id === current[0]['exits']['e']
        );
        currentRoom = nextRoom[0];

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
        <div className="flip">
          <P5Wrapper sketch={this.sketch} color={this.state.color}></P5Wrapper>
        </div>
      </div>
    );
  }
}

export default Island;

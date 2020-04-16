import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import 'p5/lib/addons/p5.sound';
import Status from './Status'
import Actions from './Actions'

import axios from 'axios'
import qs from 'qs'
import {sha256} from 'js-sha256'
import Collapsible from 'react-collapsible';
import './SASS/App.sass';
import island from './img/Island.jpg'
import schatzinsel from './img/SchatzinselLogo.svg'
import {BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
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


// 'https://schatzinsel.herokuapp.com/map

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


// Corey
// const activePlayer = '65ef3fd1d9226f97f50a440cb4dd09b64e0d6a8c'

// Levi
const activePlayer = '3c0bafec5baddbb3fa7a8ca7c72c2b9b3b3062a9'

//Bryce
// const activePlayer = '75578be1cf6136d88fb6b170e43b7da71dea5f84'

// curl -X POST -H 'Authorization: Token 3c0bafec5baddbb3fa7a8ca7c72c2b9b3b3062a9' -H "Content-Type: application/json" -d '{"name":"treasure"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/
// curl -X POST -H 'Authorization: Token 3c0bafec5baddbb3fa7a8ca7c72c2b9b3b3062a9' -H "Content-Type: application/json" -d '{"name":"treasure", "confirm":"yes"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/
class Island extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.location.state.token,
      currentRoom: {room_id: 22222},
      previousRoom: '...',
      open: false
    };
  }

  change = roomN => {
    this.setState({ currentRoom: roomN });
  };

  instruct = (val) => {
    let rules = document.getElementsByClassName('instructions')[0]
    let button = document.getElementsByClassName('instruct-button')[0]

    if (val === false) {
      rules.style.display = 'flex'
      button.style.color = 'lime'
      button.style.textShadow = '0px 0px 10px black, 0px 0px 10px black, 0px 0px 10px black, 0px 0px 10px black, 0px 0px 10px black'


    }
    else {
      rules.style.display = 'none'
      button.style.color = 'black'
      button.style.textShadow = 'none'

    }

    this.setState({open: !val})
  }

  sketch(p) {

    function connections() {
      let connected;
      for (let i = 0; i < knownLocations.length; i++) {
        for (let direction in knownLocations[i]["exits"] ) {
        connected = knownLocations.filter(loc => loc.room_id === knownLocations[i]["exits"][direction])[0]
        p.stroke('black');
        p.strokeWeight(10);
        p.line(
          knownLocations[i]["coordinates"][0]*51-2510,
          1999 - knownLocations[i]["coordinates"][1]*51+1875,
          connected["coordinates"][0]*51-2510,
          1999 - connected["coordinates"][1]*51+1875
        );
      }
      }
    }
    

    function treasureMap() {
      for (let i = 0; i < knownLocations.length; i++) {
        if (knownLocations[i].room_id === 250 && mining === true) {
          p.stroke('white');
          p.strokeWeight(5);
          p.ellipseMode(p.RADIUS);
          p.fill('blue');
          p.circle(
            knownLocations[i].coordinates[0]*51-2510,
            1999 - knownLocations[i].coordinates[1]*51+1875,
            30
          );
        }
        else if (knownLocations[i].room_id === currentRoom.room_id) {
          p.stroke('black');
          p.strokeWeight(5);
          p.ellipseMode(p.RADIUS);
          p.fill('white');
          p.circle(
            knownLocations[i].coordinates[0]*51-2510,
            1999 - knownLocations[i].coordinates[1]*51+1875,
            25
          );
        }
        else if (knownLocations[i].title === "Shop") {
          p.noStroke()
          p.ellipseMode(p.RADIUS);
          p.fill('gold');
          p.circle(
            knownLocations[i].coordinates[0]*51-2510,
            1999 - knownLocations[i].coordinates[1]*51+1875,
            15
          );
        }

        else if (knownLocations[i].title === "Mt. Holloway" || knownLocations[i].title === "The Peak of Mt. Holloway") {
          p.noStroke();
          p.ellipseMode(p.RADIUS);
          p.fill('red');
          p.circle(
            knownLocations[i].coordinates[0]*51-2510,
            1999 - knownLocations[i].coordinates[1]*51+1875,
            15
          );
        }
        else if (knownLocations[i].title === "A Dark Cave") {
          p.noStroke();
          p.ellipseMode(p.RADIUS);
          p.fill('#484848');
          p.circle(
            knownLocations[i].coordinates[0]*51-2510,
            1999 - knownLocations[i].coordinates[1]*51+1875,
            15
          );
        }
        else if (knownLocations[i].title === "Pirate Ry's") {
          p.noStroke();
          p.ellipseMode(p.RADIUS);
          p.fill('aqua');
          p.circle(
            knownLocations[i].coordinates[0]*51-2510,
            1999 - knownLocations[i].coordinates[1]*51+1875,
            15
          );
        }
        else if (knownLocations[i].title !== "A misty room") {
          p.noStroke();
          p.ellipseMode(p.RADIUS);
          p.fill('wheat');
          p.circle(
            knownLocations[i].coordinates[0]*51-2510,
            1999 - knownLocations[i].coordinates[1]*51+1875,
            15
          );
        }

        else {
          p.noStroke();   
          p.ellipseMode(p.RADIUS);
          p.fill('green');
          p.circle(
            knownLocations[i].coordinates[0]*51-2510,
            1999 - knownLocations[i].coordinates[1]*51+1875,
            15
          );
        }
      }
    }

    function words() {
      for (let i = 0; i < knownLocations.length; i++) {
        if (knownLocations[i].room_id === 250 && mining === true) {
          p.noStroke();
          p.textSize(12);
          p.fill('white');
          p.textAlign(p.CENTER);
          p.text(
            'Mining',
            knownLocations[i].coordinates[0]*51-2510,
            1999 - knownLocations[i].coordinates[1]*51+1875+4
          );

        }
        else if (knownLocations[i].room_id === currentRoom.room_id || knownLocations[i].room_id === 461 || knownLocations[i].room_id === 495 || knownLocations[i].room_id === 499 || knownLocations[i].room_id === 1 || knownLocations[i].room_id === 467 || knownLocations[i].room_id === 0) {
          p.noStroke();
          p.textSize(12);
          p.fill('black');
          p.textAlign(p.CENTER);
          p.text(
            knownLocations[i].room_id,
            knownLocations[i].coordinates[0]*51-2510,
            1999 - knownLocations[i].coordinates[1]*51+1875+4
          );
        }
        else if (knownLocations[i].title === "A Dark Cave" || knownLocations[i].title === "Mt. Holloway" || knownLocations[i].title === "The Peak of Mt. Holloway") {
          p.noStroke();
          p.textSize(12);
          p.fill('white');
          p.textAlign(p.CENTER);
          p.text(
            knownLocations[i].room_id,
            knownLocations[i].coordinates[0]*51-2510,
            1999 - knownLocations[i].coordinates[1]*51+1875+4
          );
        }
        else {
          p.noStroke();
          p.textSize(12);
          p.fill('white');
          p.textAlign(p.CENTER);
          p.text(
            knownLocations[i].room_id,
            knownLocations[i].coordinates[0]*51-2510,
            1999 - knownLocations[i].coordinates[1]*51+1875+4
          );

        }
      }

    }
    // cooldown: 1
    // description: "You are standing in the center of a brightly lit room. You notice a shop to the west and exits to the north, south and east."
    // elevation: 0
    // errors: []
    // exits: (4) ["n", "s", "e", "w"]
    // items: []
    // messages: []
    // players: (30) ["stefan", "axisofevil", "player198", "michael trew", "ryan matthews", "dewayne", "player204", "player199", "player195", "player194", "player191", "player186", "player185", "player183", "player210", "player209", "player208", "player207", "player206", "player205", "player203", "player193", "player178", "player173", "player172", "player168", "player170", "player161", "player166", "player169"]
    // room_id: 0
    // terrain: "NORMAL"
    // title: "A brightly lit room"
    let canvas;
    let dom;
    let dom2;
    let dom3;
    let dom4;
    let previousRoom;
    let knownLocations;
  let currentRoom;
  let visitedRoutes;
  let status;
  let pN;
  let pC;
  let rC;
  let rD;
  let rE;
  let rI;
  let rM;
  let rP;
  let rID;
  let rTE;
  let rTI;
  let rERR;

  let pG;
  let pE;
  let pSTRENGTH;
  let pSPEED;
  let tt;
  let st;
  let re;
  let mt;
  let TOKEN;
  let road;
  let shop;
  let name;
  let mine;
  let pray;
  let transform;
  let minetext;
  let road_submit;
  let shop_submit;
  let abilities_submit;
  let name_submit;
  let transform_submit;
  let abilities_selection;
  let bg;

  let enable;

    let mining = false;
  p.preload = () => {
    TOKEN = document.getElementsByClassName("map")[0].getAttribute('token')

      p.loadJSON('https://schatzinsel.herokuapp.com/map', getInit);
      bg = p.loadImage(island, 1260, 1600)
  }
    p.setup = () => {
      canvas = p.createCanvas(1260, 1600);

      p.noStroke();
      dom = p.select('.player')
      dom2 = p.select('.goodbye');
      dom3 = p.select('.inventory')
      dom4 = p.select('.current')
      road = p.select('.road-b')
      shop = p.select('.shop-b')
      name = p.select('.name-b')
      mine = p.select('.mine-b')
      pray = p.select('.pray-b')
      enable = p.select('.abilities-b')
      transform = p.select('.transform-b')


      road_submit = p.select('.road-submit')
      shop_submit = p.select('.shop-submit')
      abilities_submit = p.select('.abilities-submit')
      name_submit = p.select('.name-submit')
      transform_submit = p.select('.transform-submit')

      abilities_selection = p.select('.abilities-selection')


      shop.mousePressed(() => offen('shop'))
      road.mousePressed(() => offen('road'))
      name.mousePressed(() => offen('new-name'))
      enable.mousePressed(() => offen('abilities'))
      mine.mousePressed(() => miner('mine'))
      pray.mousePressed(() => prayer())
      transform.mousePressed(() => offen('transform'))

      road_submit.mousePressed(roading)
      shop_submit.mousePressed(shopping)
      abilities_submit.mousePressed(enabling)
      name_submit.mousePressed(identity)
      transform_submit.mousePressed(transmorph)

      abilities_selection.input(addClass)
      dom.mousePressed(stat)
      dom3.mousePressed(inv)
      dom4.mousePressed(gotIt)
      previousRoom = '...'
    };

    async function transmorph() {
      let i_value = document.getElementsByClassName('transform-input')[0].value
      let transform_status = p.select('.transform-status')

      if (i_value && currentRoom.room_id === 195) {

        await fetch('https://lambda-treasure-hunt.herokuapp.com/api/adv/transmogrify/', {
          method: 'POST', // or 'PUT'
          headers:{
            'Authorization': `Token ${TOKEN}`,
          },
          body: JSON.stringify({name: i_value})
        }).then(res => res.json())
        .then(response => {
          console.log(response, 'to transform')
            if (response.messages.length !== 0) {
              let inventory = document.getElementsByClassName('inventory')[0]
              inventory.classList.toggle("open")
              let s = document.getElementsByClassName('player')[0]
              s.classList.toggle("open")
              wait(10000)
              inv()
              wait(10000)
              stat()
            }
            if (response.messages.length !== 0) {
              transform_status.html(`Status: ${response.messages}`)
              console.log('res', response.messages)
            }
  
            else {
              transform_status.html(`Status: You cannot transform this item`)
              console.log('none', response.messages.length)
            }
        }
          )
        .catch(error => console.error('Error:', error));


      }

      else {
        if (currentRoom.room_id !== 495) {
          transform_status.html(`Status: YOU MUST FIND THE TRANSMOGRIFIER!`)
        }

        else {
          transform_status.html(`Status: YOU CANNOT TRANSMOGRIFY NOTHING!`)
        }
      }
    }

    function addClass() {
      let s_value = document.getElementsByClassName('abilities-selection')[0].value
      let show = document.getElementsByClassName('dash')[0]
      let inputI = document.getElementsByClassName('abilities-input')[0]

      if (s_value === 'Dash') {
        let vis = document.getElementsByClassName('visible')

        for (let item of vis) {
          item.classList.remove('hide')
        }

        show.classList.remove('pass')
        inputI.value = ''
      }

      else if (s_value === 'Fly') {
        let vis = document.getElementsByClassName('visible')
        console.log(vis)
        show.classList.remove('pass')

        for (let item of vis) {
          item.classList.add('hide')
        }
        inputI.value = ''
      }

      else {
        let vis = document.getElementsByClassName('visible')

        for (let item of vis) {
          item.classList.remove('hide')
        }
        show.classList.add('pass')
        inputI.value = ''
      }

    }

    async function identity() {
      let s_value = document.getElementsByClassName('name-selection')[0].value
      let i_value = document.getElementsByClassName('name-input')[0].value
      let name_status = p.select('.name-status')

      if (s_value === 'New') {
        await fetch('https://lambda-treasure-hunt.herokuapp.com/api/adv/change_name/', {
          method: 'POST', // or 'PUT'
          headers:{
            'Authorization': `Token ${TOKEN}`,
          },
          body: JSON.stringify({name: i_value})
        }).then(res => res.json())
        .then(response => {
        console.log('redo', response)
          if (i_value.length !== 0) {

            name_status.html(`Status: ${response.messages[0]} `)

          }

          else {
            name_status.html(`Status: You must have an identity!`)

          }



        }
          )
        .catch(error => console.error('Error:', error));
    }

    else if (s_value === 'Confirm') {

      await fetch('https://lambda-treasure-hunt.herokuapp.com/api/adv/change_name/', {
        method: 'POST', // or 'PUT'
        headers:{
          'Authorization': `Token ${TOKEN}`,
        },
        body: JSON.stringify({name: i_value, confirm: "aye"})
      }).then(res => res.json())
      .then(response => {
        if (i_value.length !== 0) {

          name_status.html(`Status: ${response.messages} `)
          let s = document.getElementsByClassName('player')[0]
          s.classList.toggle("open")
          wait(15000)
          stat()
        }

        else {
          name_status.html(`Status: You must have an identity!`)

        }



      }
        )
      .catch(error => console.error('Error:', error));

  }
}

    async function enabling() {
      let s_value = document.getElementsByClassName('abilities-selection')[0].value
      let i_value = document.getElementsByClassName('abilities-input')[0].value
      let abilities_status = p.select('.abilities-status')

      if (s_value === 'Carry') {
        console.log('Yes')

        await fetch('https://lambda-treasure-hunt.herokuapp.com/api/adv/carry/', {
          method: 'POST', // or 'PUT'
          headers:{
            'Authorization': `Token ${TOKEN}`,
          },
          body: JSON.stringify({name: i_value})
        }).then(res => res.json())
        .then(response => {

          if (response.messages.length !== 0) {

            abilities_status.html(`Status: ${response.messages} `)
            let s = document.getElementsByClassName('player')[0]
            s.classList.toggle("open")
            wait(10000)
            stat()
          }

          else if (response.errors.length === 1) {
            console.log('error', response)

            abilities_status.html(`Status: ${response.errors}`)
          }
          else {
            console.log('hold', response)
            abilities_status.html(`Status: You cannot ask companion to hold an imaginary item!`)

          }



        }
          )
        .catch(error => console.error('Error:', error));
      }

      else if (s_value === 'Receive') {

        await fetch('https://lambda-treasure-hunt.herokuapp.com/api/adv/receive/', {
          method: 'POST', // or 'PUT'
          headers:{
            'Authorization': `Token ${TOKEN}`,
          }
        }).then(res => res.json())
        .then(response => {
          console.log('receive', response)
          if (response.messages.length !== 0) {

            abilities_status.html(`Status: ${response.messages} `)

            let s = document.getElementsByClassName('player')[0]
            s.classList.toggle("open")
            wait(10000)
            stat()

          }

          else {
            abilities_status.html(`Status: ${response.errors} `)
 
          }
        }
          )
        .catch(error => console.error('Error:', error));
    }

    else if (s_value === 'Dash') {

      let d_value = p.select('.direction-selection').value()
      let r_value = p.select('.rooms-input').value()
      let final_value = i_value
      console.log(String(final_value), 'final', JSON.stringify(r_value))
      final_value = final_value.replace(/\s/g, '');
      console.log(final_value, 'final', r_value)
      await fetch('https://lambda-treasure-hunt.herokuapp.com/api/adv/dash/', {
        method: 'POST', // or 'PUT'
        headers:{
          'Authorization': `Token ${TOKEN}`,
        },
        body: JSON.stringify({direction: d_value, num_rooms: r_value, next_room_ids: final_value })
      }).then(res => res.json())
      .then(response => {
        console.log('receive', response)
        if (response.messages.length !== 0) {
          let found;
          let regex = /\d+/;
          console.log(response.messages.length, response)

          let c = document.getElementsByClassName('current')[0]
          c.classList.toggle("open")
          if (response.messages.length >=2) {
            if (response.messages[response.messages.length-1].includes("You have dashed") === false) {
              abilities_status.html(`Status: ${response.messages[response.messages.length-2]} `)

              found = response.messages[response.messages.length-2].match(regex);
            }
            else {
              abilities_status.html(`Status: ${response.messages[response.messages.length-1]} `)
              found = response.messages[response.messages.length-1].match(regex);  
            }
            currentRoom.room_id = Number(found[0])
            wait(15000)
            gotIt()
            p.redraw(1);
            console.log(currentRoom.room_id, 'room id after')
          }

          else if (response.messages.length === 1) {
            found = response.messages[response.messages.length-1].match(regex);  
            currentRoom.room_id = Number(found[0])
            abilities_status.html(`Status: ${response.messages} `)

            wait(15000)
            gotIt()
            p.redraw(1);
          }

          else {
            abilities_status.html(`Status: ${response.errors} `)

          }
        }

        else {
          abilities_status.html(`Status: ${response.errors} `)

        }
      }
        )
      .catch(error => {
        console.error('Error:', error)
        abilities_status.html(`Status: Check your direction!`)
      });
  }


  else if (s_value === 'Fly') {

    let d_value = p.select('.direction-selection').value()


    await fetch('https://lambda-treasure-hunt.herokuapp.com/api/adv/fly/', {
      method: 'POST', // or 'PUT'
      headers:{
        'Authorization': `Token ${TOKEN}`,
      },
      body: JSON.stringify({direction: d_value})
    }).then(res => res.json())
    .then(response => {

      if (response.messages.length !== 0) {

        console.log('Fly', response)
        let c = document.getElementsByClassName('current')[0]
        c.classList.toggle("open")
  
        currentRoom.room_id = Number(response.room_id)
  
        wait(15000)
        gotIt()
        p.redraw(1);
        abilities_status.html(`Status: ${response.messages} `)

      }

      else {
        console.log('Fly', response)

        abilities_status.html(`Status: ${response.errors}`)

      }


    }
      )
    .catch(error => {
      console.error('Error:', error)
    });
}
  }

    async function prayer() {
      let r = document.getElementsByClassName('pray')[0]
      r.classList.toggle("open")

      let prayer_status = p.select('.praying')
      if ((r.classList.contains('open') && currentRoom.room_id === 461) || (r.classList.contains('open') && currentRoom.room_id === 499) || (r.classList.contains('open') && currentRoom.room_id === 22) ) {

        console.log('inside prayer')

        await fetch('https://lambda-treasure-hunt.herokuapp.com/api/adv/pray/', {
          method: 'POST', // or 'PUT'
          headers:{
            'Authorization': `Token ${TOKEN}`,
          }
        }).then(res => res.json())
        .then(response => {
          console.log(response)
          prayer_status.html(response.messages)
        }  
          )
        .catch(error => console.error('Error:', error));


      }

      else {
        prayer_status.html("YOU MUST FIND THE SHRINE TO PRAY!")  
      }
    }
    async function roading() {
      let s_value = document.getElementsByClassName('road-selection')[0].value
      let i_value = document.getElementsByClassName('road-input')[0].value
      let road_status = p.select('.road-status')

      if (s_value === 'Take') {

        await fetch('https://lambda-treasure-hunt.herokuapp.com/api/adv/take/', {
          method: 'POST', // or 'PUT'
          headers:{
            'Authorization': `Token ${TOKEN}`,
          },
          body: JSON.stringify({name: i_value})
        }).then(res => res.json())
        .then(response => {
            if (response.messages.length !== 0) {
              let inventory = document.getElementsByClassName('inventory')[0]
              inventory.classList.toggle("open")
              let c = document.getElementsByClassName('current')[0]
              c.classList.toggle("open")
              let s = document.getElementsByClassName('player')[0]
              s.classList.toggle("open")
              wait(5000)
              inv()
              wait(15000)
              gotIt()
              wait(10000)
              stat()
            }
            if (response.messages.length !== 0) {
              road_status.html(`Status: ${response.messages}`)
              console.log('res', response.messages)
            }
  
            else {
              road_status.html(`Status: You cannot take this item`)
              console.log('none', response.messages.length)
            }
        }
          )
        .catch(error => console.error('Error:', error));


      }

      else if (s_value === 'Drop') {

        await fetch('https://lambda-treasure-hunt.herokuapp.com/api/adv/drop/', {
          method: 'POST', // or 'PUT'
          headers:{
            'Authorization': `Token ${TOKEN}`,
          },
          body: JSON.stringify({name: i_value})
        }).then(res => res.json())
        .then(response => {
          if (response.messages.length !== 0) {
            let inventory = document.getElementsByClassName('inventory')[0]
            inventory.classList.toggle("open")
            let c = document.getElementsByClassName('current')[0]
            c.classList.toggle("open")
            let s = document.getElementsByClassName('player')[0]
            s.classList.toggle("open")
            wait(5000)
            inv()
            wait(5000)
            gotIt()
            wait(10000)
            stat()
          }
          if (response.messages.length !== 0) {
            road_status.html(`Status: ${response.messages}`)
            console.log('res', response.messages)
          }

          else {
            road_status.html(`Status: You cannot drop this item.`)
            console.log('none', response.messages.length)
          }
          
        }
          )
        .catch(error => console.error('Error:', error));
      }

    else if (s_value === 'Examine') {
      await fetch('https://lambda-treasure-hunt.herokuapp.com/api/adv/examine/', {
        method: 'POST', // or 'PUT'
        headers:{
          'Authorization': `Token ${TOKEN}`,
        },
        body: JSON.stringify({name: i_value})
      }).then(res => res.json())
      .then(response => {
        if (response.hasOwnProperty('room_id') === false) {
          road_status.html(`Status: ${response.description}`)
          console.log('res', response)
        }

        else {
          road_status.html(`Status: You cannot examine this item.`)
          console.log('none', response.messages.length)
        }
      }
        )
      .catch(error => console.error('Error:', error));

    }

    else if (s_value === 'Wear') {
      await fetch('https://lambda-treasure-hunt.herokuapp.com/api/adv/wear/', {
        method: 'POST', // or 'PUT'
        headers:{
          'Authorization': `Token ${TOKEN}`,
        },
        body: JSON.stringify({name: i_value})
      }).then(res => res.json())
      .then(response => {
        console.log(response, 'to wear')
        if (response.messages.length !== 0) {
          road_status.html(`Status: ${response.messages}`)
          let s = document.getElementsByClassName('player')[0]
          s.classList.toggle("open")
          wait(10000)
          stat()
        }

        else {
          road_status.html(`Status: You cannot wear this item.`)
          console.log('none', response)
        }
      }
        )
      .catch(error => console.error('Error:', error));

    }
    }

    async function shopping() {
      let s_value = document.getElementsByClassName('shop-selection')[0].value
      let i_value = document.getElementsByClassName('shop-input')[0].value
      let shop_status = p.select('.shop-status')

      if (currentRoom.room_id !== 1) {
        shop_status.html('Status: You cannot shop in the middle of nowhere.')
      }

      else if (s_value === 'Sell') {
        await fetch('https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/', {
          method: 'POST', // or 'PUT'
          headers:{
            'Authorization': `Token ${TOKEN}`,
          },
          body: JSON.stringify({name: i_value})
        }).then(res => res.json())
        .then(response => {
          if (response.messages.length !== 0) {
            shop_status.html(`Status: ${response.messages[0]} Please confirm purchase.`)
          }

          else {
            shop_status.html(`Status: You cannot sell an imaginary item.`)
          }
        }
          )
        .catch(error => console.error('Error:', error));
  
      }
    
      else if (s_value === 'Confirm') {
        await fetch('https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/', {
          method: 'POST', // or 'PUT'
          headers:{
            'Authorization': `Token ${TOKEN}`,
          },
          body: JSON.stringify({name: i_value, confirm: "yes"})
        }).then(res => res.json())
        .then(response => {
          if (response.messages.length !== 0) {
            shop_status.html(`Status: ${response.messages[0]}`)
            let inventory = document.getElementsByClassName('inventory')[0]
            inventory.classList.toggle("open")
            let s = document.getElementsByClassName('player')[0]
            s.classList.toggle("open")
            wait(5000)
            inv()
            wait(10000)
            stat()
          }

          else {
            shop_status.html(`Status: You cannot confirm purchase of an imaginary item.`)
          }
        }
          )
        .catch(error => console.error('Error:', error));
  
      }
    }
    function getInit(data) {
      knownLocations = data 
      const config = {
        method: 'get',
        url: 'https://lambda-treasure-hunt.herokuapp.com/api/adv/init/',
        headers: {
          Authorization: `Token ${TOKEN}`
        }
      };
      axios(config)
        .then(res => {
        currentRoom = res.data
        })
        .catch(err => console.log('GetDataError: ', err))
      }

      function offen(c) {
        let r = document.getElementsByClassName(c)[0]
        r.classList.toggle("open")
        }

      async function miner(c) {
          let mineB = document.getElementsByClassName('mine')[0]
          minetext = document.getElementsByClassName('mining')[0]

          let r = document.getElementsByClassName(c)[0]
          r.classList.toggle("open")  

          if ((mineB.classList.contains('open') === false && mineB.style.backgroundColor === 'blue') || (mineB.classList.contains('open') === false && mineB.style.backgroundColor === 'gold' && currentRoom.room_id === 250)) {
            r.classList.toggle("open")  
          }
       
          if (mineB.classList.contains('open') === true || currentRoom.room_id === 250) {
            console.log('it entered in')

            if (currentRoom.room_id === 250) {
              mineB.style.backgroundColor = "blue"
              minetext.style.color = "white"
              minetext.innerHTML = 'MINING...'
              proof_of_work()
            }
            else  {
              mineB.style.backgroundColor = "gold"
              minetext.style.color = "black"
              minetext.innerHTML = 'YOU CANNOT MINE IN THIS ROOM!'
              await fetch('https://lambda-treasure-hunt.herokuapp.com/api/bc/get_balance/', {
                method: 'GET', // or 'PUT'
                headers:{
                  'Authorization': `Token ${TOKEN}`,
                }
              }).then(res => res.json())
              .then(response => {
                wait(3000)
                minetext.innerHTML = response.messages[0]
              })
              .catch(error => console.error('Error:', error));
            }
          }
          }

    async function stat() {
      let s = document.getElementsByClassName('player')[0]
      s.classList.toggle("open")

      if (s.classList.contains('open')) {
   
        pN = p.select('.pN')
        pC = p.select('.pC')
        pG = p.select('.pG')
        pE = p.select('.pE')
        pSTRENGTH = p.select('.pSTRENGTH')
        pSPEED = p.select('.pSPEED')
        await fetch('https://lambda-treasure-hunt.herokuapp.com/api/adv/status/', {
          method: 'POST', // or 'PUT'
          headers:{
            'Authorization': `Token ${TOKEN}`,
          }
        }).then(res => res.json())
        .then(response => {
          pN.html('name: ' + response.name)
          pC.html('cooldown: ' + response.cooldown)
          pG.html('gold: ' + response.gold)
          pE.html('encumbrance: ' + response.encumbrance)
          pSTRENGTH.html('strength: ' + response.strength)
          pSPEED.html('speed: ' + response.speed)
  
        
        }
          
          )
        .catch(error => console.error('Error:', error));







      }
    }

    function clear() {

    }

    async function inv() {
      let inventory = document.getElementsByClassName('inventory')[0]
      inventory.classList.toggle("open")
      if (inventory.classList.contains("open")) {

        tt = p.select('.tt');
        st = p.select('.st');
        mt = p.select('.mt');
        let t = 0
        let s = 0
        let m = []
  
        let load;
  
        await fetch('https://lambda-treasure-hunt.herokuapp.com/api/adv/status/', {
          method: 'POST', // or 'PUT'
          headers:{
            'Authorization': `Token ${TOKEN}`,
          }
        }).then(res => res.json())
        .then(response => {
          load = Object.values(response.inventory)
          for (let i = 0; i<load.length;i++) {
            if (load[i] === "tiny treasure") {
              t+=1
            }
            else if (load[i] === "small treasure") {
              s+=1
            }
            else {
              m.push(load[i])
            }
          }
        }
          )
        .catch(error => console.error('Error:', error));
        
        m = JSON.stringify(m).replace(/\[?["](\w*\d*\s*\w*\d*)["][,]?\]?/g, '|  $1  |')
  
        tt.html('tiny treasure: '+ t)
        st.html('small treasure: '+ s)
        mt.html('misc treasure: '+ m)





      }
    }

    function wait(ms) {
      var start = new Date().getTime();
      var end = start;
      while (end < start + ms) {
        end = new Date().getTime();
      }
    }

    async function gotIt() {
      let c = document.getElementsByClassName('current')[0]
      c.classList.toggle("open")
      if (c.classList.contains("open")) {
          rC = p.select('.rC');
          rD = p.select('.rD');
          rE = p.select('.rE');
          rI = p.select('.rI');
          rM = p.select('.rM');
          rP = p.select('.rP');
          rID = p.select('.rID');
          rTE = p.select('.rTE');
          rTI = p.select('.rTI');
          rERR = p.select('.rERR');
          const config = {
              method: 'get',
              url: 'https://lambda-treasure-hunt.herokuapp.com/api/adv/init/',
              headers: {
                Authorization: `Token ${TOKEN}`
              }
            };

          await axios(config)
              .then(res => {
                let players = JSON.stringify(res.data.players).replace(/\[?["](\w*\d*\s*\w*\d*)["][,]?\]?/g, '|  $1  |')
                let gifts = JSON.stringify(res.data.items).replace(/\[?["](\w*\d*\s*\w*\d*)["][,]?\]?/g, '|  $1  |')
                let messages = JSON.stringify(res.data.messages).replace(/\[?["](\w*\d*\s*\w*\d*)["][,]?\]?/g, '|  $1  |')

              currentRoom = res.data
              rID.html('room id: ' + res.data.room_id)
              rC.html('cooldown: ' + res.data.cooldown)
              rD.html(res.data.description)
              rM.html('messages: ' + messages)
              rTI.html('title: ' + res.data.title)
              rTE.html('terrain: ' + res.data.terrain)
              rE.html('elevation: ' + res.data.elevation)
              rERR.html('errors: ' + JSON.stringify(res.data.errors))
              rP.html('players: ' + players)
              rI.html('items: ' + gifts)
              })
              .catch(err => console.log('GetDataError: ', err))
        }
  }

  

    function direction(d) {
      let c = document.getElementsByClassName('current')[0]
      c.classList.toggle("open")
     fetch('https://lambda-treasure-hunt.herokuapp.com/api/adv/move/', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({direction: d}), // data can be `string` or {object}!
      headers:{
        'Authorization': `Token ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => {
      currentRoom = response
      console.log('Arrr', response.cooldown)
      wait(response.cooldown*1000+1000)
      gotIt()
    })
    .catch(error => console.error('Error:', error));
}
// curl -X POST -H 'Authorization:`Token ${TOKEN}` -H "Content-Type: application/json" -d '{"name":"denise escobar"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/examine/


async function proof_of_work() {
  let last_proof;
  let difficulty;
  let solution;
  let cooldown;
  minetext = document.getElementsByClassName('mining')[0]

  mining = true;
  p.redraw(1);

  await fetch('https://lambda-treasure-hunt.herokuapp.com/api/bc/last_proof/', {
    method: 'GET', // or 'PUT'
    headers:{
      'Authorization': `Token ${TOKEN}`,
    }
  }).then(res => res.json())
  .then(response => {
    last_proof = response.proof
    difficulty = response.difficulty
    cooldown = response.cooldown
  })
  .catch(error => console.error('Error:', error));
  // curl -X GET -H 'Authorization:`Token ${TOKEN}` https://lambda-treasure-hunt.herokuapp.com/api/bc/get_balance/
  let proof = 4

  while (valid_proof(last_proof, proof, difficulty) === false) {
    proof +=3
  }

  solution = proof

  console.log('s', solution, 'p', proof, 'l', last_proof, 'd', difficulty)

  wait(5000)

  await fetch('https://lambda-treasure-hunt.herokuapp.com/api/bc/mine/', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify({proof: solution}), // data can be `string` or {object}!
    headers:{
      'Authorization': `Token ${TOKEN}`,
    }
  }).then(res => res.json())
  .then(response => console.log(minetext.innerHTML = response.messages[0]))
  .catch(error => console.error('Error:', error));

  wait(15000)
  await fetch('https://lambda-treasure-hunt.herokuapp.com/api/bc/get_balance/', {
    method: 'GET', // or 'PUT'
    headers:{
      'Authorization': `Token ${TOKEN}`,
    }
  }).then(res => res.json())
  .then(response => {
    minetext.innerHTML = response.messages[0]
  })
  .catch(error => console.error('Error:', error));
  mining = false;
  p.redraw(1);
}
// curl -X GET -H 'Authorization:`Token ${TOKEN}` https://lambda-treasure-hunt.herokuapp.com/api/bc/get_balance/

  
function valid_proof(last_proof, proof, proof_difficulty) {
  let difficulty = proof_difficulty;
  let guess = sha256(String(last_proof) + String(proof));


  if (guess.startsWith("0".repeat(difficulty))) {
    return guess
  }

  else {
    return false
  }

}

    p.draw = () => {
      p.background(bg);

      if (currentRoom !== undefined)
      {


        connections();
        treasureMap();
        words();
        if (previousRoom !== '...') {
          dom2.html(`Previous Room ID: ${previousRoom.room_id}`);
        }
        else {
          dom2.html(`Previous Room ID:`);
        }
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
      else if (p.keyCode === p.ENTER && currentRoom.room_id === 250) {
        miner('mine')
      }
      else if (p.keyCode === p.ENTER && currentRoom.room_id !== 250) {
        miner('mine')
      }
      else if (
        p.keyCode === p.UP_ARROW &&
        current[0]['exits']['n'] !== undefined
      ) {

        previousRoom = currentRoom;
        direction('n')
        p.redraw(1);
      } else if (
        p.keyCode === p.LEFT_ARROW &&
        current[0]['exits']['w'] !== undefined
      ) {

        previousRoom = currentRoom;
        direction('w')

        p.redraw(1);
      } else if (
        p.keyCode === p.RIGHT_ARROW &&
        current[0]['exits']['e'] !== undefined
      ) {
        previousRoom = currentRoom;
        direction('e')
        p.redraw(1);
      } else {
        console.log('No direction exists!');
      }
    };

    p.myCustomRedrawAccordingToNewPropsHandler = newProps => {
      // if (canvas) {
      //   TOKEN = newProps.token
      //   console.log('TOKEN', TOKEN)
      // }
        //Make sure the canvas has been created
    };
  }

  render() {
    return (
      <div className='game'>
        <NavLink to={{pathname: `/`}}>
        <img className='login-logo' src={schatzinsel} alt="logo" />
        <h6>Logout</h6>
        </NavLink>
        <div className="flip map" token={this.state.token}>
          <Status className='stat' />
          <P5Wrapper className='island' sketch={this.sketch} color={this.state.color} island={island}></P5Wrapper>
          <Actions className='act' />
        </div>
        <h2 className='instruct-button' onClick={()=> this.instruct(this.state.open)}>ⓘ</h2>
        <div className='instructions'>
          <h1 className='instructH1'>
            Schatzinsel Instructions
          </h1>
          <h2>
            Introduction
          </h2>
          <p>
            Welcome to Schatzinsel! From German,
            Schatzinsel translates to Treasure Island.
            Who doesn't want to find treasure? As a pirate,
            your mission is to search the island for treasure. Over time, you can
            buy items to update your character to become the biggest and baddest of all pirates.
          </p>
          <h2>
            Island Navigation
          </h2>
          <p>
          The island consists of 500 different locations. Every location is connected.
          They are connected to either one, two, three, or four different locations.
          You can only go to connected locations.
          </p>
          <h3>
          Arrow Keys
          </h3>
          <div className='directions'>
          <div>
          <h4>◀</h4>
          <p>
          Move Left
          </p>
          </div>

          <div>
          <h4>▲</h4>
          <p>
          Move Up
          </p>
          </div>

          <div>
          <h4>▶</h4>
          <p>
          Move Right
          </p>
          </div>

          <div>
          <h4>▼</h4>
          <p>
          Move Down
          </p>
          </div>
          </div>

          <h2>
          Abilities
          </h2>

          <h3>
          On the Road
          </h3>
          <div>
          <h4>Examine</h4>
          <p>
          Type in an item that you own or is in the current room to see more details.
          </p>
          </div>
          <div>
          <h4>Take</h4>
          <p>
          Type in an item that is in the current room to see more details.
          </p>
          </div>
          <h4>Drop</h4>
          <h4>Wear</h4>

        </div>
      </div>
    );
  }
}

export default Island;

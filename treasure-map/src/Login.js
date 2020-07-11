   
import React, { Component } from 'react';
import schatzinsel from './img/SchatzinselLogo.svg'
import {BrowserRouter as Router,Route, NavLink} from 'react-router-dom';

import './SASS/Login.sass';

import axios from 'axios';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        };
      }


  getValue = () => {
    let select = document.getElementsByClassName('selection')[0]
    let NAME = document.getElementsByClassName('name')[0]
    let PASSWORD = document.getElementsByClassName('password')[0]


    let value = select.value
    let token;
    for (let i = 0; i<select.length;i++) {
        if (select.options[i].selected) {
            token = select.options[i].getAttribute("token")
        }
    }
    this.setState({name: value, password: token})
    NAME.value = value
    PASSWORD.value = token

  }

  logIn = async() => {
    let res = await axios.post('https://l-t-h.herokuapp.com/api/login/', {username: "levi.appenfelder", email: "levi-appenfelder@lambdastudents.com", password: "7e2uanjyco"})
    console.log(res)
  }

  render() {
    return (
        <div className="Login">
        <img className='login-logo' src={schatzinsel} alt="logo" />
        <h1>Schatzinsel</h1>
        <form>
            <div>
            <h2>Name:</h2>
            <input className='name'></input>
            </div>

            <div>
            <h2>Password:</h2>
            <input type='password' className='password'></input>
            </div>
        </form>
        <div onClick={this.getValue} className='dropdown'>
        <h2>Default Pirate:</h2>
        <select className='selection' onChange={this.getValue} onClick={this.getValue}>
          <option token='b00e2b2a4f4f6370aade400038eb2f06ca343d49' value='Leviathan'>Leviathan</option>
        </select>
        </div>
        <NavLink  to={{pathname: `/island`, state: {token: this.state.password }}}>
        <button onClick={this.logIn}>Find the Gold!</button>
        </NavLink>
        </div>
    );
  }
}



export default Login

   
   
   
   
   
   
   
   

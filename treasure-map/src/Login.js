   
import React, { Component } from 'react';
import schatzinsel from './img/SchatzinselLogo.svg'
import {BrowserRouter as Router,Route, NavLink} from 'react-router-dom';


   

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
        <h2>Default Pirates:</h2>
        <select className='selection' onChange={this.getValue} onClick={this.getValue}>
          <option token='75578be1cf6136d88fb6b170e43b7da71dea5f84' value='BryceMonkey'>BryceMonkey</option>
          <option token='65ef3fd1d9226f97f50a440cb4dd09b64e0d6a8c' value='Phinehas'>Phinehas</option>
          <option token='3c0bafec5baddbb3fa7a8ca7c72c2b9b3b3062a9' value='Leviathan'>Leviathan</option>
        </select>
        </div>
        <NavLink  to={{pathname: `/island`, state: {token: this.state.password }}}>
        <button>Find the Gold!</button>
        </NavLink>
        </div>
    );
  }
}



export default Login

   
   
   
   
   
   
   
   

import React from 'react';
import logo from './logo.svg';
import Island from './Island.js'
import Login from './Login';
import schatzinsel from './img/SchatzinselLogo.svg'
import {BrowserRouter as Router,Route, NavLink} from 'react-router-dom';

import './SASS/Login.sass'

function App() {
  return (
    <div className="Login">
      <Route exact path="/" render={(props) => <Login {...props} />} />
      <Route exact path="/island" render={(props) => <Island {...props} />} />
    </div>
  );
}

export default App;

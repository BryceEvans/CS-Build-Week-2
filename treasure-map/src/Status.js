import './App.css';
import React, { Component } from 'react';
import axios from 'axios';

import Player from './Player';


class PlayerStatus extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            playerToken : '',
            player : {}
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this)
        this.getStatus = this.getStatus.bind(this)
    }
    inputChangeHandler = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    getStatus = (e) => {
        e.preventDefault()
        const playerToken = this.state.playerToken
        console.log("player token", playerToken)
        const config = {
            method: 'post',
            url: 'https://lambda-treasure-hunt.herokuapp.com/api/adv/status/',
            headers: {
              Authorization: `Token ${playerToken}`
            }
          };
        axios(config)
            .then(res => {
                console.log(res.data)
            this.setState({player:res.data})

            })
            .catch(err => console.log('GetDataError: ', err))

    }    

    render() {
        return (
            <div>
                <form onSubmit={this.getStatus}>
                    <input type="text" name = "playerToken" onChange={this.inputChangeHandler} value={this.state.playerToken} placeholder="Enter your player token!"/>
                    <button type='submit'>Submit</button>
                </form>
                <Player player = {this.state.player}/>
            </div>
        )
    }
}

export default PlayerStatus
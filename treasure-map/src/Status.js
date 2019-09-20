import React, { Component } from 'react';
import axios from 'axios';

import Player from './Player';
import Inventory from './Inventory';


class PlayerStatus extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            playerToken : '',
            player : {},
            inventory: []
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
                console.log(Object.values(res.data.inventory))
            this.setState({player:res.data, inventory: Object.values(res.data.inventory)})

            })
            .catch(err => console.log('GetDataError: ', err))

    }    

    render() {
        let player = this.state.player
        delete player.inventory
        return (
            <div className='status'>

                <form onSubmit={this.getStatus}>
                    <input type="text" name = "playerToken" onChange={this.inputChangeHandler} value={this.state.playerToken} placeholder="Enter your player token!"/>
                    <button type='submit'>Submit</button>
                </form>
                <div className='panel'>
                <div>
                <Player player = {player}/>
                </div>
                <div>
                <Inventory inventory = {this.state.inventory} />
                </div>
                </div>
            </div>
        )
    }
}

export default PlayerStatus
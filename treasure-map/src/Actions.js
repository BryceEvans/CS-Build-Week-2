import React, { Component } from 'react';
import axios from 'axios';

import Player from './Player';
import Inventory from './Inventory';
import CurrentRoom from './CurrentRoom';
import './SASS/Actions.sass';


class Actions extends React.Component{
    
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
            <div className='actions'>
                <div>
                <form>
                    <select className='selection' onChange={this.getValue} onClick={this.getValue}>
                        <option value='Examine'>Examine</option>
                        <option value='Take'>Take</option>
                        <option value='Drop'>Drop</option>
                        <option value='Wear'>Wear</option>
                    </select>
                    <input></input>
                </form>
                <button className='isle-buttons'>On the Road</button>
                </div>

                <div>
                <form>
                <select className='selection' onChange={this.getValue} onClick={this.getValue}>
                        <option value='Examine'>Sell</option>
                        <option value='Take'>Confirm Sale Of</option>
                </select>                    
                <input></input>
                </form>
                <button className='isle-buttons'>Shop</button>
                </div>

                <div>
                <form>
                    <select className='selection' onChange={this.getValue} onClick={this.getValue}>
                        <option value='New Name'>New Name</option>
                        <option value='Confirm Name'>Confirm Sale Of</option>
                    </select>                      <input></input>
                </form>
                <button className='isle-buttons'>Change Name</button>
                </div>

                <div>
                <form>
                    <h4>Mining...</h4>
                    <h5>...</h5>
                </form>
                <button className='isle-buttons'>Mine</button>
                </div>

                <div>
                <form>
                    <h4>Pray</h4>
                    <h5>...</h5>
                </form>
                <button className='isle-buttons'>Pray</button>
                </div>

                <div>
                <form>
                    <select className='selection' onChange={this.getValue} onClick={this.getValue}>
                        <option value='Fly'>Fly</option>
                        <option value='Dash'>Dash</option>
                    </select>                      
                    <input></input>
                </form>
                <button className='isle-buttons'>Abilities</button>
                </div>

                <div>
                <form>
                    <h4>Transform</h4>
                    <input></input>
                </form>
                <button className='isle-buttons'>Transmorgify</button>
                </div>

            </div>
        )
    }
}

export default Actions
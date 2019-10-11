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
                <div className='a-buttons'>
                <form className='road'>
                    <select className='a-select road-selection' onChange={this.getValue} onClick={this.getValue}>
                        <option value='Examine'>Examine</option>
                        <option value='Take'>Take</option>
                        <option value='Drop'>Drop</option>
                        <option value='Wear'>Wear</option>
                    </select>
                    <input className='a-input road-input'></input>
                    <h4 className='road-submit'>Submit</h4>
                    <h5 className='road-status'> Status: </h5>
                </form>
                <button className='isle-buttons road-b'>On the Road</button>
                </div>

                <div className='a-buttons'>
                <form className='shop'>
                    <select className='a-select shop-selection' onChange={this.getValue} onClick={this.getValue}>
                            <option value='Sell'>Sell</option>
                            <option value='Confirm'>Confirm Sale Of</option>
                    </select>                    
                    <input className ='a-input shop-input'></input>
                    <h4 className='shop-submit'>Submit</h4>
                    <h5 className='shop-status'> Status: </h5>
                </form>
                <button className='isle-buttons shop-b'>Shop</button>
                </div>

                <div className='a-buttons'>
                <form className='new-name'>
                    <select className=' a-select name-selection' onChange={this.getValue} onClick={this.getValue}>
                        <option value='New'>New Name</option>
                        <option value='Confirm'>Confirm Sale Of</option>
                    </select>                      
                    <input className='a-input name-input'></input>
                    <h4 className='name-submit'>Submit</h4>
                    <h5 className='name-status'> Status: </h5>
                </form>
                <button className='isle-buttons name-b'>Change Name</button>
                </div>

                <div className='a-buttons'>
                <form className='mine'>
                    <h3 className='mining'>Mining...</h3>
                </form>
                <button className='isle-buttons mine-b'>Mine</button>
                </div>

                <div className='a-buttons'>
                <form className='pray'>
                    <h3 className='praying'>Praying...</h3>
                </form>
                <button className='isle-buttons pray-b'>Pray</button>
                </div>

                <div className='a-buttons'>
                <form className='abilities'>
                    <select className=' a-select abilities-selection' onChange={this.getValue} onClick={this.getValue}>
                        <option value='Dash'>Dash</option>
                        <option value='Fly'>Fly</option>
                        <option value='Carry'>Carry</option>
                        <option value='Receive'>Receive</option>
                    </select>
                    <div className='dash'>
                        <div className='dashdiv direction'>
                            <h5>direction:</h5>
                            <select className='direction-selection' onChange={this.getValue} onClick={this.getValue}>
                                <option value='n'>north</option>
                                <option value='s'>south</option>
                                <option value='e'>east</option>
                                <option value='w'>west</option>
                            </select>
                        </div>
                        <div className='dashdiv rooms visible'>
                            <h5 className='visible'>number of rooms:</h5>
                            <input className='rooms-input visible'></input>
                        </div>
                        <h5 className='visible'>Room IDs</h5>
                    </div>
                    <input className='a-input abilities-input visible'></input>
                    <h4 className='abilities-submit'>Submit</h4>
                    <h5 className='abilities-status'> Status: </h5>
                </form>
                <button className='isle-buttons abilities-b'>Abilities</button>
                </div>

                <div className='a-buttons'>
                <form className='transform'>
                    <h4>Transform</h4>
                    <input className='a-input transform-input'></input>
                    <h4 className='transform-submit'>Submit</h4>
                    <h5 className='transform-status'> Status: </h5>

                </form>
                <button className='isle-buttons transform-b'>Transmogrify</button>
                </div>

            </div>
        )
    }
}

export default Actions
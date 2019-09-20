import React from 'react';
import Collapsible from 'react-collapsible';
import './SASS/App.sass';

export default props => {
    return (
        <div className="player">
            <Collapsible trigger={'Player Status'}>
            {Object.keys(props.player).map( (key, index)=>{
                return <div key={index}><h2>{key}: {key, props.player[key]}</h2></div>
            })}
            </Collapsible>
        </div>
    )
}


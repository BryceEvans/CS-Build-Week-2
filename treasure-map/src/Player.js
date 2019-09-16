import React from 'react';

export default props => {
    return (
        <div>
            {Object.keys(props.player).map( (key, index)=>{
                return <div key={index}>{key}: {key, props.player[key]}</div>
            })}
        </div>
    )
}


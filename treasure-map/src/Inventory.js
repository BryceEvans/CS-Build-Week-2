import React from 'react';
import Collapsible from 'react-collapsible';
import './SASS/App.sass';

export default props => {
    return (
        <div className="inventory">
            <Collapsible trigger={'Inventory'}>
            {props.inventory.map( (item, index) => {
                return <h2 key={index}>{item}</h2>
            })}
            </Collapsible>
        </div>
    )
}
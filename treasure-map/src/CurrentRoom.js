import React from 'react';
import Collapsible from 'react-collapsible';
import './SASS/App.sass';

export default props => {
    return (
        <div className="accordion current">
            <Collapsible trigger={'Current Room ⬇'}>
                <h4 className='rID'>room id:</h4>
                <h4 className='rTI'>title:</h4>
                <h5 className='rD'>description:</h5>
                <h4 className='rTE'>terrain:</h4>
                <h4 className='rE'>elevation:</h4>
                <h4 className='rI'></h4>
                <h4 className='rP'></h4>
                <h4 className='rC'>cooldown:</h4>

            </Collapsible>
        </div>
    )
}

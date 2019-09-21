import React from 'react';
import Collapsible from 'react-collapsible';
import './SASS/App.sass';

export default props => {
    return (
        <div className="accordion player">
            <Collapsible trigger={'Player Status ⬇'}>
                <h4 className='pN'>name:</h4>
                <h4 className='pC'>cooldown:</h4>
                <h4 className='pE'>encumbrance:</h4>
                <h4 className='pSTRENGTH'>strength:</h4>
                <h4 className='pSPEED'>speed:</h4>
                <h4 className='pG'>gold:</h4>
            </Collapsible>
        </div>
    )
}


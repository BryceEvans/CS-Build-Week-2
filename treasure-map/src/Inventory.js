import React from 'react';
import Collapsible from 'react-collapsible';
import './SASS/App.sass';

export default props => {
    return (
        <div className="accordion inventory">
            <Collapsible trigger={'Inventory ⬇'}>
                <h4 className='tt'>tiny treasure:</h4>
                <h4 className='st'>small treasure:</h4>
                <h4 className='mt'>misc treasure:</h4>
            </Collapsible>
        </div>
    )
}
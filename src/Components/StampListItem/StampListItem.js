import React from 'react';


const StampListItem = (props) => (
    <div>
        
        <input type="hidden" value={props.stampID} className='id' disabled={true}     />
        
        <input
            type     = "text"
            name     = {'stampTime'}
            value    = {props.stampTime}
            onChange = {props.handleChange}
        />
        
        <input
            type     = "text"
            name     = {'stampText'}
            value    = {props.stampText}
            onChange = {props.handleChange}
        />
        
        <button onClick={props.handleDelete}>Delete</button>

    </div>
);


export default StampListItem;
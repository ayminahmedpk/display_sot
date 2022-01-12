import React from 'react';


const StampListItem = (props) => (
    <div>
        <input type="hidden" value={props.stampID} className='id' disabled={true}     />
        <input type="text" value={props.stampTime} onChange={props.handleChangeTime}/>
        <input type="text" value={props.stampText} onChange={props.handleChangeText}/>
        <button onClick={props.handleDeleteStamp}>Delete</button>
    </div>
);


export default StampListItem;


import {React, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    updateStamp ,
    deleteStamp ,
} from '../../Redux/stampReducer';

import StampListItem from '../StampListItem/StampListItem.js';


const StampList = () => {
    const stampList = useSelector(state => state.stamps.stampList)
    const dispatch  = useDispatch();

    const handleChange = (event) => {
        const id    = event.target.parentElement.querySelector('.id').value;
        const name  = event.target.name;
        const value = event.target.value;
        dispatch(updateStamp([id, name, value]));
    }

    const handleDelete = (event) => {
        const id = event.target.parentElement.querySelector('.id').value;
        dispatch(deleteStamp([id]));
    }
    
    const stampElements = stampList.map(stampItem =>
        <div key={stampItem.stampID}>
            <StampListItem
                stampID      = {stampItem.stampID}
                stampTime    = {stampItem.stampTime}
                stampText    = {stampItem.stampText}
                handleChange = {handleChange}
                handleDelete = {handleDelete}
            />
        </div>
    );

    return (
        <>
        {stampElements}
        </>
    )
}

export default StampList;
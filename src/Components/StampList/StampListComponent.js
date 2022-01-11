

import {React, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { editStampTime, editStampText } from '../../Redux/stampReducer';

import StampListItem from './StampListItem';


const StampListComponent = () => {
    const stampList = useSelector(state => state.stamps.stampList)
    const dispatch  = useDispatch();

    const handleChangeTime = (event) => {
        const id = event.target.parentElement.querySelector('.id').value;
        const value = event.target.value;
        dispatch(editStampTime({id: id, stampTime : value}))
    }

    const handleChangeText = (event) => {
        const id = event.target.parentElement.querySelector('.id').value;
        const value = event.target.value;
        dispatch(editStampText({id: id, stampText : value}))
    }
    
    const stampElements = stampList.map(stampItem =>
        <div key={stampItem.stampID}>
            <StampListItem
                stampID          = {stampItem.stampID}
                stampTime        = {stampItem.stampTime}
                stampText        = {stampItem.stampText}
                handleChangeTime = {handleChangeTime}
                handleChangeText = {handleChangeText}
            />
        </div>
    );

    return (
        <>
        {stampElements}
        </>
    )
}

export default StampListComponent;
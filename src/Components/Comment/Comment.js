import React from "react";

import { useSelector } from "react-redux";


const Comment = () => {

    const stampList = useSelector(state => state.stamps.stampList);

    const generateComment = () => {
        let comment = '';
        stampList.forEach(stampItem => {
            comment += `${stampItem.stampTime} ${stampItem.stampText}\n`;
        })
        console.log(comment);
    }

    const generateStampsButton = (
        <button onClick={generateComment}> Generate Comment </button>
    );

    const addStampsPrompt = (
        <div>Add stamps to get started...</div>
    );

    return (
        <>
            {stampList.length > 0 ? generateStampsButton : <></>  }
        </>
    )
}


export default Comment;
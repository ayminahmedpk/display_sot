import {
    React,
    useState
} from "react";

import { useSelector } from "react-redux";


const Comment = () => {

    const stampList = useSelector(state => state.stamps.stampList);

    const [comment       , setComment     ] = useState('') ;
    const [textboxStatus , setTextboxStatus] = useState(0) ;

    const handleCommentChange = (event) => {
        setComment(event.target.value)
    }

    const textbox = (
        <textarea
            type="textarea"
            value={comment}
            onChange={handleCommentChange}
        />
    )

    const generateComment = () => {
        let generatedComment = '';
        stampList.forEach(stampItem => {
            generatedComment += `${stampItem.stampTime} ${stampItem.stampText}\n`;
        })
        setTextboxStatus(1);
        setComment(generatedComment);
    }

    // const comment = generateComment();

    const generateStampsButton = (
        <button onClick={generateComment}> Generate Comment </button>
    );

    const addStampsPrompt = (
        <div>Add stamps to get started...</div>
    );

    return (
        <>
            {stampList.length > 0 ? <div>{generateStampsButton}</div> : <></>}
            {textboxStatus ? <div>{textbox}</div> : <></>}
        </>
    )
}


export default Comment;
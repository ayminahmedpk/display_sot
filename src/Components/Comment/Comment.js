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

    const secondsToTimeString = (totalSeconds) => {
        const seconds = totalSeconds % 60;
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const hours   = Math.floor(totalSeconds / 3600);
        console.log(`${hours}:${minutes}:${seconds}`);
        return (`${hours}:${minutes}:${seconds}`)
    }

    const textbox = (
        <div>
            <textarea
                type="textarea"
                value={comment}
                onChange={handleCommentChange}
            />
        </div>
    )

    const generateComment = () => {
        let generatedComment = '';
        stampList.forEach(stampItem => {
            generatedComment += secondsToTimeString(stampItem.stampTime);
            generatedComment += ` ${stampItem.stampText}\n`;
        })
        setTextboxStatus(1);
        setComment(generatedComment);
    }

    // const comment = generateComment();

    const generateStampsButton = (
        <div>
            <button onClick={generateComment}> Generate Comment </button>
        </div>
    );

    const addStampsPrompt = (
        <div>Add stamps to get started...</div>
    );

    const hideTextbox = () => { setTextboxStatus(0); }
    const hideTextboxButton = (
        <div>
            <button onClick={hideTextbox}>
                Hide Textbox
            </button>
        </div>
    )

    return (
        <>
            {(
                stampList.length > 0 ?
                <div>{generateStampsButton}</div> :
                <div>{addStampsPrompt}</div>
            )}
            {(
                (stampList.length > 0 & textboxStatus) ?
                <>{textbox}{hideTextboxButton}</> :
                <></>
            )}
        </>
    )
}


export default Comment;
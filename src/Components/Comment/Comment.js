import {
    React,
    useState
} from "react";

import { useSelector } from "react-redux";

import {
    tryPostingComment ,
    revokeAccess      ,
} from "./CommentOAuthHelper";


const Comment = () => {

    const stampList = useSelector(state => state.stamps.stampList);

    const [ comment       , setComment       ] = useState('') ;
    const [ textboxStatus , setTextboxStatus ] = useState(0)  ;
    const [ feedback      , setFeedback      ] = useState('') ;

    const handleCommentChange = (event) => {
        setComment(event.target.value)
    }

    const secondsToTimeString = (totalSeconds) => {
        const seconds = totalSeconds % 60;
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const hours   = Math.floor(totalSeconds / 3600);
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

    const postCommentHandler = async () => {
        const result = await tryPostingComment(comment);
        switch (result[0]) {

            case 'no token' :
                setFeedback(
                    <div>
                        <p>
                            No access token found. Please allow access in the
                            new tab and retry posting the comment in this tab.
                        </p>
                    </div>
                );
            break;

            case 'success' :
                setFeedback(
                    <div>
                        <p>
                            Comment posted successfully.
                            Link : <a href={result[1]}>{result[1]}</a>
                        </p>
                    </div>
                );
            break;

            case 'error' :
                setFeedback(
                    <div>
                        <p>
                            Unable to post comment directly.
                            Clearing cache may help.
                        </p>
                        <p>
                            Error message: {result[1]}
                        </p>
                    </div>
                );

        }
    }

    const postCommentButton = (
        <button onClick={postCommentHandler}> Post Comment Directly </button>
    )

    const revokeAccessButton = (
        <button onClick={revokeAccess}> Revoke Youtube Access </button>
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
                <>
                    {textbox}
                    <div>
                        {postCommentButton}
                        {revokeAccessButton}
                    </div>
                    {hideTextboxButton}
                    {feedback}
                </> :
                <></>
            )}
        </>
    )
}


export default Comment;
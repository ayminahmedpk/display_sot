import React from 'react';

const CommentComponent = ({props}) => {

    const {
        comment             ,
        result              ,
        stampList           ,
        textboxStatus       ,
        generateComment     ,
        hideTextbox         ,
        handleCommentChange ,
        postCommentHandler  ,
        revokeYTOAuthToken  ,
    } = props;

    const textbox = (
        <div>
            <textarea
                type     = "textarea"
                value    = {comment}
                onChange = {handleCommentChange}
            />
        </div>
    )

    const generateStampsButton = (
        <div>
            <button onClick={generateComment}> Generate Comment </button>
        </div>
    );

    const addStampsPrompt = (
        <div>Add stamps to get started...</div>
    );

    
    const hideTextboxButton = (
        <div>
            <button onClick={hideTextbox}>
                Hide Textbox
            </button>
        </div>
    )

    const postCommentButton = (
        <button onClick={postCommentHandler}> Post Comment Directly </button>
    )

    const revokeAccessButton = (
        <button onClick={revokeYTOAuthToken}> Revoke Youtube Access </button>
    )

    const feedback = () => {
        switch (result[0]) {
            case 'no token found' :
                return (
                    <div>
                        <p>
                            No access token found. Please allow access in the
                            new tab and retry posting the comment in this tab.
                        </p>
                    </div>
                );
            case 'success' :
                return (
                    <div>
                        <p>
                            Comment posted successfully.
                        </p>
                        <p>
                            Link : <a href={result[1]}>{result[1]}</a>
                        </p>
                    </div>
                );
            case 'error' :
                return (
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
            default :
                    return ''
        }
    }

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
                    {feedback()}
                </> :
                <></>
            )}
        </>
    )
}


export default CommentComponent;
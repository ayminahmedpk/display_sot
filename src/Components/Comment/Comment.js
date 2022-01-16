import {
    React,
    useState
} from "react";

import { useSelector } from "react-redux";

import readAccessTokenFromStorage from "../../helperFunctions/readAccessTokenFromStorage";


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

    
    
    // OAuth functions

    // To obtain new token
    const fetchAuthorizationToken = () => {

        const endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
        var params = {
            client_id: '898576508322-96ntea1j9v37bnq24gg2e787cfs4to6i.apps.googleusercontent.com',
            redirect_uri: 'http://localhost:3000',
            scope: 'https://www.googleapis.com/auth/youtube.force-ssl',
            state: 'fetchAuthorizationToken',
            include_granted_scopes: 'true',
            response_type: 'token',
        };
    
        const form = document.createElement('form');
        form.setAttribute('method', 'GET');
        form.setAttribute('action', endpoint);
        form.setAttribute('target', '_blank'); // new tab hopefully
        for (const param in params) {
            const input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', param);
            input.setAttribute('value', params[param]);
            form.appendChild(input);
        }
        document.body.appendChild(form);
        form.submit();
    }


    // Post a comment and set feedback accordingly
    const postComment = async () => {
        const access_token = readAccessTokenFromStorage();
        const response = await fetch(
            `https://youtube.googleapis.com/youtube/v3/commentThreads?`
            + `part=snippet`
            + `&` + `access_token=${access_token}`,
            {
                method: 'POST',
                body: JSON.stringify({
                    snippet: {
                        topLevelComment : {
                            snippet: {
                                'textOriginal': comment,
                            }
                        },
                        videoId : window.location.toString().split('/').slice(-1)[0]
                    }
                })
            }
        );
        const jsonResponse = await response.json();
        if (jsonResponse.id) {
            const commentLink = "https://www.youtube.com/watch?v=" +
                                jsonResponse.snippet.videoId       +
                                "&lc="                             +
                                jsonResponse.id                    ;
            setFeedback(
                <div>
                    <p>
                        Comment posted successfully.
                        Link : <a href={commentLink}>{commentLink}</a>
                    </p>
                </div>
            )
        }
        else {
            setFeedback(
                <div>
                    <p>
                        Unable to post comment directly.
                        Clearing cache may help.
                    </p>
                    <p>
                        Error message: {jsonResponse.error.message}
                    </p>
                </div>
            );
        }
        console.log(jsonResponse);
    }

    
    // Check if token exists before posting, and set feedback accordingly.
    const tryPostingComment = () => {
        if(readAccessTokenFromStorage()) {
            postComment()
        }
        else {
            setFeedback(
                <div>
                    <p>
                        No access token found. Please allow access in the new
                        tab and retry posting the comment in this tab.
                    </p>
                </div>
            )
            fetchAuthorizationToken()
        }
    }


    // Revoke access token
    const revokeAccess = async () => {

        const access_token = readAccessTokenFromStorage();

        if(access_token) {
            const endpoint     = 'https://oauth2.googleapis.com/revoke';
        
            const form = document.createElement('form');
            form.setAttribute('method', 'POST');
            form.setAttribute('action', endpoint);
            form.setAttribute('target', '_blank'); // new tab hopefully
            
            const input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', 'token');
            input.setAttribute('value', access_token);
            form.appendChild(input);
    
            document.body.appendChild(form);
            form.submit();

            localStorage.removeItem('oauth2-test-params');
        }

    }


    const postCommentButton = (
        <button onClick={tryPostingComment}> Post Comment Directly </button>
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
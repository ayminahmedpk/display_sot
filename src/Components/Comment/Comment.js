import {
    React,
    useState
} from "react";

import { useSelector } from "react-redux";

import readAccessTokenFromStorage from "../../helperFunctions/readAccessTokenFromStorage";


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

    
    
    const fetchAuthorizationToken = () => {

        const endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
        var params = {
            client_id: '898576508322-96ntea1j9v37bnq24gg2e787cfs4to6i.apps.googleusercontent.com',
            redirect_uri: 'https://sot4.netlify.app/',
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
        const textResponse = await response.text();
        console.log(textResponse);
    }


    const tryPostingComment = () => {
        readAccessTokenFromStorage() ? postComment() : fetchAuthorizationToken()
    }

    const postCommentButton = (
        <div>
            <button onClick={tryPostingComment}>Post Comment</button>
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
                <>{textbox}{postCommentButton}{hideTextboxButton}</> :
                <></>
            )}
        </>
    )
}


export default Comment;
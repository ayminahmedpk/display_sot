import {
    React,
    useState
} from "react";

import { useSelector } from "react-redux";

import useStoredToken            from '../../CustomHooks/useStoredToken.js'           ;
import useSubmitOAuthRequestForm from '../../CustomHooks/useSubmitOAuthRequestForm'   ;
import useInsertYTCommentThread  from '../../CustomHooks/useInsertYTCommentThread.js' ;

import CommentComponent from './CommentComponent.js';


const CommentContainer = () => {

    // Redux
    const stampList = useSelector(state => state.stamps.stampList);

    // State
    const [ comment       , setComment       ] = useState('') ;
    const [ textboxStatus , setTextboxStatus ] = useState(0)  ;
    const [ result        , setResult        ] = useState('') ;
    
    // Custom Hooks
    const [getStoredToken, deleteStoredToken] = useStoredToken()          ;
    const submitOAuthRequestForm              = useSubmitOAuthRequestForm ;
    const insertYTCommentThread               = useInsertYTCommentThread  ;

    

    const handleCommentChange = (event) => { setComment(event.target.value) } ;
    const hideTextbox         = ()      => { setTextboxStatus(0);           } ;

    const secondsToTimeString = (totalSeconds) => {
        const seconds = totalSeconds % 60;
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const hours   = Math.floor(totalSeconds / 3600);
        return (`${hours}:${minutes}:${seconds}`)
    };

    const generateComment = () => {
        let generatedComment = '';
        stampList.forEach(stampItem => {
            generatedComment += secondsToTimeString(stampItem.stampTime);
            generatedComment += ` ${stampItem.stampText}\n`;
        })
        setTextboxStatus(1);
        setComment(generatedComment);
    };

    const requestYTOAuthToken = () => {
        const endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
        var OAuthParams = {
            client_id: '898576508322-96ntea1j9v37bnq24gg2e787cfs4to6i.apps.googleusercontent.com',
            redirect_uri: 'http://localhost:3000',
            scope: 'https://www.googleapis.com/auth/youtube.force-ssl',
            state: 'fetchAuthorizationToken',
            include_granted_scopes: 'true',
            response_type: 'token',
        };
        const method = 'GET';
        submitOAuthRequestForm({endpoint, OAuthParams, method});
    };

    const postCommentHandler = async () => {
        const token = getStoredToken();
        if (!token) {
            setResult(['no token found']);
            requestYTOAuthToken();
        }
        else {
            const videoId = window.location.toString().split('/').slice(-1)[0]
            const response = await insertYTCommentThread({token, comment, videoId});
            setResult(response);
        }
    };

    const revokeYTOAuthToken = () => {
        const endpoint = 'https://oauth2.googleapis.com/revoke' ;
        const OAuthParams = { token : getStoredToken() }        ;
        const method   = 'POST'                                 ;
        submitOAuthRequestForm({endpoint, OAuthParams, method}) ;
        deleteStoredToken()                                     ;
    }

    const ComponentProps = {
        comment             ,
        result              ,
        stampList           ,
        textboxStatus       ,
        generateComment     ,
        hideTextbox         ,
        handleCommentChange ,
        postCommentHandler  ,
        revokeYTOAuthToken  ,
    };

    return (
        <>
            <CommentComponent props={ ComponentProps } />
        </>
    );

}

export default CommentContainer;
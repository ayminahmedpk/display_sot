
import readAccessTokenFromStorage from '../../helperFunctions/readAccessTokenFromStorage';


    export const fetchAuthorizationToken = () => {

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
    export const postComment = async (comment) => {
        
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
            return ['success', commentLink] ;
        }
        else {
            return ['error', jsonResponse.error.message] ;
        }

    }

    
    // Check if token exists before posting, and set feedback accordingly.
    export const tryPostingComment = (comment) => {
        if(readAccessTokenFromStorage()) {
            return postComment(comment)
        }
        else {
            fetchAuthorizationToken()
            return ['no token']
        }
    }


    // Revoke access token
    export const revokeAccess = async () => {

        const access_token = readAccessTokenFromStorage();

        if (access_token) {
            const endpoint = 'https://oauth2.googleapis.com/revoke';
        
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
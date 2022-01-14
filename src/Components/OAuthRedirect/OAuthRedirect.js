import React from 'react';

import urlToEncodedParams    from '../../helperFunctions/urlToEncodedParams.js';
import decodeParams          from '../../helperFunctions/decodeParams.js';
import readAccessTokenFromStorage from '../../helperFunctions/readAccessTokenFromStorage.js';


const OAuthRedirect = () => {
    
    /*
    console.log(window.location.hash);
    const params = decodeParams(urlToEncodedParams(window.location.hash, 'hash'));
    console.log(params);
    */

    if (window.location.hash !== '') {
    const params = decodeParams(urlToEncodedParams(window.location.hash, 'hash'));
    console.log(params);
    localStorage.setItem('oauth2-test-params', JSON.stringify(params));
    }

    const message = (
        readAccessTokenFromStorage() ? (
            <div>
                <p>Access Token received.</p>
                <p>You can close this tab and try posting the comment again.</p>
            </div>
        ) :
        (
            <div>
                <p>Unable to receive access token.</p>
                <p>Please try again or copy and post the comment manually.</p>
            </div>
        )
    )

    return (
        <>
            {message}
        </>
    )

}

export default OAuthRedirect;
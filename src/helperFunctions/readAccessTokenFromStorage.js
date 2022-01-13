

const readAccessTokenFromStorage = () => {
    const params = JSON.parse(localStorage.getItem('oauth2-test-params'));
    if (params && params['access_token']) {
        return params['access_token'];
    }
    else return false;
}

export default readAccessTokenFromStorage;
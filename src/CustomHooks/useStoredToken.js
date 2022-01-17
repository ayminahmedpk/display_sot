

const useStoredToken = () => {

    const getStoredToken = () => {
        const params = JSON.parse(localStorage.getItem('oauth2-test-params'));
        if (params && params['access_token']) {
            return params['access_token'];
        }
        else return false;
    };
    
    const removeStoredToken = () => {
        localStorage.removeItem('oauth2-test-params');
    };

    return [getStoredToken, removeStoredToken];

}

export default useStoredToken;
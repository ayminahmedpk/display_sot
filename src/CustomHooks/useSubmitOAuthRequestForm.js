const useSubmitOAuthRequestForm = ({endpoint, OAuthParams, method}) => {

    const form = document.createElement('form');
    form.setAttribute('method', method);
    form.setAttribute('action', endpoint);
    form.setAttribute('target', '_blank'); // new tab hopefully
    for (const parameter in OAuthParams) {
        const input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', parameter);
        input.setAttribute('value', OAuthParams[parameter]);
        form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
}

export default useSubmitOAuthRequestForm;


/*
OAuthParams need to be passed by hook caller
Sample OAuthParams, example for Google Auth for Youtube comments

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
*/

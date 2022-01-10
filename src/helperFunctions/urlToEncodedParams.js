// Turns a url into an object of with two items; first one is a string that
// holds the endpoint, second one is an object that holds all the query
// parameters as key-value pairs.

const urlToEncodedParams = (url) => {
    const queryString = url.split('?')[1];
    const queryPairs  = queryString.split('&').map(
        query => query.split('=')
    );
    const encodedParams = {};
    queryPairs.forEach(pair => {
        encodedParams[pair[0]] = pair[1];
    });
    return encodedParams;
}


export default urlToEncodedParams;
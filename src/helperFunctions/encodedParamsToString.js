
// Turns an object of query parameters into a query string

// Query can be made to start with '&' instead of '?'  by setting
// isFirstQuery to false.


const encodedParamsToString = (encodedParams, isFirstQuery=true) => {
    let query = '';
    for (let key in encodedParams) {
        query += `&${key}=${encodedParams[key]}`;
    }
    if (isFirstQuery) { query = `?${query.substring(1)}`}
    return query;
}


export default encodedParamsToString;
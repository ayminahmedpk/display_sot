

// Turns a parameters object and sub objects into a single object with
// all parameters as URI encoded key-value properties.

const encodeParams = (params) => {

    let encodedParams = {};

    for (let key in params) {

        if ( typeof(params[key]) ==='object' ) {
            const encodedSubParams = encodeParams(params[key]);
            encodedParams = {...encodedParams, ...encodedSubParams}
            continue;
        }

        let encodedKey   = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(params[key])
        
        encodedParams[encodedKey] = encodedValue;
    }

    return encodedParams;
}


export default encodeParams;


// console.log(encodeParams(queryParams));
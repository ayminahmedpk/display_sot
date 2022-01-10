// Decode parameter keys and values from HTML encoding to simple text




const decodeParams = (params) => {
    const decodedParams = {};
    for (let param in params) {
        decodedParams[decodeURIComponent(param)] = 
        decodeURIComponent(params[param].replace(/\+/g, '%20'));
    }
    return decodedParams;
}




export default decodeParams;
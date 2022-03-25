export default (query) => { // this is the only react here
    if(query){ // if there is a string 
        const queryString = query.split("?")[1]; // get the stuff after the ?
        if(queryString.length > 0){ // if there was stuff after the ? 
            const params = queryString.split("&"); // split on & (gives an array)
            const paramObj = {}; // create an object
            params.forEach(param => { // for each part of the split array 
                const keyValue = param.split("="); // split on the = 
                paramObj[keyValue[0]] = keyValue[1]; // use the string before the = as key and after as value 
            });
            return paramObj; // return the object
        }
    }

    return {}; // otherwise return empty object
}

// ?cid=619386618c57a571f4463d45&type=page

// export default (query) => {
//     let urlParams = new URLSearchParams(query);
//     const result = {};
//     for (const [key, value] of urlParams.entries()) { 
//       result[key] = value;
//     }
//     return result;
//   }
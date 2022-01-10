
// Console log an object' (and sub objects') keys and values.

const logObject = (inputObject, incomingNotation) => {
    const notation = incomingNotation || '{parent}';
    for (let key in inputObject) {
        if (typeof(inputObject[key]) === 'object' ) {
            logObject(inputObject[key], `${notation} -> {${key}}` );
            continue;
        }
        console.log(`${notation} -> ${key} === ${inputObject[key]}`);
    }
}

export default logObject;



// Test

// const one = {
//     q : 1,
//     w : 2,
//     e : 3,
//     r : {
//         a : 4,
//         s : 5,
//         d : 6,
//         f : {
//             z : 7,
//             x : 8,
//             c : 9,
//             v : 0,
//         },
//     },
// }

// logObject(one);
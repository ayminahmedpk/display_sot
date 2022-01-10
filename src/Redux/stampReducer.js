// Dependencies
// React



// Action creators
export const addStamp = ({stampTime, stampText}) => {
    return {
        type    : 'ADD_STAMP' ,
        payload : {stampTime, stampText} ,
    }
}


// Initial state object
export const initialState = {
    stampList     : [] ,
    stampsCreated : 0  ,
};


// Reducer function
export const stampReducer = (state = initialState, action) => {
    switch(action.type) {
        
        case 'ADD_STAMP' :
            const newStampList = JSON.parse(JSON.stringify(state.stampList));
            newStampList.push({
                stampID : state.stampsCreated,
                ...action.payload}
            );
            return {
                stampList     : newStampList            ,
                stampsCreated : state.stampsCreated + 1 ,
            }
        break;
        
        default  :
                return state;

    }
}


/*

Clone the current state including the array of arrays,
push the new value into the array with the additional id,
increment the stampsCreated value

State:
[ [0, 2444, 'Something 1'], [1, 3555, 'Something 2']  ]

*/
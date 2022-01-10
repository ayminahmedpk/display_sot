// Dependencies
// React



// Action creators
export const addStamp = (stampText) => {
    return {
        type    : 'ADD_STAMP' ,
        payload : stampText   ,
    }
}


// Initial state object
export const initialState = {
    stampsCreated : 0  ,
    stampList     : [] ,
};


// Reducer function
export const stampReducer = (state = initialState, action) => {
    switch(action.type) {
        
        case 'ADD_STAMP' :
            return {
                ...state ,
                stampsCreated : state.stampsCreated + 1,
                stampList     : [
                                    ...state.stampList ,
                                    action.payload     ,
                                ],
            }
        
        default  :
                return state;

    }
}
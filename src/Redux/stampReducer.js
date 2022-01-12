// Dependencies
// React



// Action creators
export const addStamp = ({stampTime, stampText}) => {
    return {
        type    : 'ADD_STAMP' ,
        payload : {stampTime, stampText} ,
    }
}

export const editStampTime = ({id, stampTime}) => {
    return {
        type    : 'EDIT_STAMP_TIME' ,
        payload : {id, stampTime}   ,
    }
}

export const editStampText = ({id, stampText}) => {
    return {
        type    : 'EDIT_STAMP_TEXT' ,
        payload : {id, stampText} ,
    }
}

export const deleteStamp = (id) => {
    return {
        type    : 'DELETE_STAMP' ,
        payload : id             ,
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
        
        case 'ADD_STAMP' : {
            const newStampList = JSON.parse(JSON.stringify(state.stampList));
            newStampList.push({
                stampID : state.stampsCreated ,
                ...action.payload             ,
            });
            return {
                stampList     : newStampList            ,
                stampsCreated : state.stampsCreated + 1 ,
            }
            break;
        }

        case 'EDIT_STAMP_TIME' : {
            const newStampList  = JSON.parse(JSON.stringify(state.stampList));
            const targetElement = newStampList.find(
                element =>  (element.stampID == action.payload.id)
            );
            targetElement.stampTime = action.payload.stampTime;
            return {
                stampList     : newStampList        ,
                stampsCreated : state.stampsCreated ,
            }
            break;
        }

        case 'EDIT_STAMP_TEXT' : {
            const newStampList  = JSON.parse(JSON.stringify(state.stampList));
            const targetElement = newStampList.find(
                element =>  (element.stampID == action.payload.id)
            );
            targetElement.stampText = action.payload.stampText;
            return {
                stampList     : newStampList        ,
                stampsCreated : state.stampsCreated ,
            }
            break;
        }

        case 'DELETE_STAMP' : {
            const newStampList = state.stampList.filter(element => (
                element.stampID!=action.payload
            ))
            return {
                stampList     : newStampList        ,
                stampsCreated : state.stampsCreated ,
            }
        }
        
        default : { return state; }

    }
}


/*

Clone the current state including the array of arrays,
push the new value into the array with the additional id,
increment the stampsCreated value

State:
[ [0, 2444, 'Something 1'], [1, 3555, 'Something 2']  ]

*/
// Initial state object
export const initialState = {
    stampList     : [] ,
    stampsCreated : 0  ,
};


// Reducer function
export const stampReducer = (state = initialState, action) => {
    switch(action.type) {
        
        case 'CREATE_STAMP' : {
            const newStampList = JSON.parse(JSON.stringify(state.stampList));
            newStampList.push({
                stampID : state.stampsCreated ,
                ...action.payload             ,
            });
            return {
                stampList     : newStampList            ,
                stampsCreated : state.stampsCreated + 1 ,
            }
        }

        case 'UPDATE_STAMP' : {
            const newStampList  = JSON.parse(JSON.stringify(state.stampList));
            const targetElement = newStampList.find(
                element =>  (element.stampID == action.payload.id)
            );
            const targetValue = action.payload.name;
            targetElement[targetValue] = action.payload.value;
            
            return {
                stampList     : newStampList        ,
                stampsCreated : state.stampsCreated ,
            }
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


// Action object creators - return an object with a type and optional payload
export const createStamp = ([stampTime, stampText]) => ({
    type    : 'CREATE_STAMP'         ,
    payload : {stampTime, stampText} ,
});

export const updateStamp = ([id, name, value]) => ({
    type    : 'UPDATE_STAMP'    ,
    payload : {id, name, value} ,
});

export const deleteStamp = ([id]) => ({
        type    : 'DELETE_STAMP' ,
        payload : id             ,
});
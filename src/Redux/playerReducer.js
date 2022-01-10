// Dependencies
// React
import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';




// Action creators
export const updatePlayerRef = (ref) => {
    return {
        type    : 'UPDATE_PLAYER_REF' ,
        payload : ref                 ,
    }
}


// Initial state object
export const initialState = {
    playerRef: null
};


// Reducer function
const playerReducer = (state = initialState, action) => {
    switch(action.type) {
        
        case 'UPDATE_PLAYER_REF' :
            return {
                ...state                   ,
                playerRef : action.payload ,
            }
        
        default  :
                return state;

    }
}


// Store
const store = createStore(playerReducer, composeWithDevTools());
//const store = createStore(playerReducer);
//store.subscribe( () => console.log(store.getState()) );



export default store;
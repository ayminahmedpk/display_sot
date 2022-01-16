// Dependencies
// React
import { createStore } from "redux";

// Reducers
import { rootReducer } from "./rootReducer" ;


// Store
const store = createStore(rootReducer);
// store.subscribe( () => console.log(store.getState()) );

export default store;
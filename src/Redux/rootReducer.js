// Dependencies
// React
import { combineReducers} from "redux";

// Reducers
import { playerReducer } from "./playerReducer" ;
import { stampReducer }  from "./stampReducer"  ;


export const rootReducer = combineReducers(
  {
    player: playerReducer ,
    stamps: stampReducer  ,
  }
);
import { combineReducers } from "redux";
import busReducer from "./bus";

const rootReducer = combineReducers({
  bus: busReducer
});

export default rootReducer;

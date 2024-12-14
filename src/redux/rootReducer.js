import { combineReducers } from "redux";


import { userReducer } from "./slices/user/user.reducer";

export const rootReducer = combineReducers({
	user: userReducer,
});
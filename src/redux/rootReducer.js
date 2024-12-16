import { combineReducers } from "redux";

import userReducer from "./slices/user.slice";
import shopReducer from "./slices/shop.slice"

export const rootReducer = combineReducers({
	user: userReducer,
	shop: shopReducer,
});
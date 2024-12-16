import { combineReducers } from "redux";

import appReducer from "./slices/app.slice";
import userReducer from "./slices/user.slice";
import shopReducer from "./slices/shop.slice"

export const rootReducer = combineReducers({
	app: appReducer,
	user: userReducer,
	shop: shopReducer,
});
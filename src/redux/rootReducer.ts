import { combineReducers } from "redux";

import appReducer from "./slices/app.slice";
import userReducer from "./slices/user.slice";
import shopReducer from "./slices/shop.slice"

import { AppState } from "../types/app.types";
import { StoreUserProfileInterface } from "../types/user.interface";
import { ShopState } from "../types/shop.interface";

export const rootReducer = combineReducers({
	app: appReducer,
	user: userReducer,
	shop: shopReducer,
});

export type RootState = {
	app: AppState,
	user: StoreUserProfileInterface,
	shop: ShopState,
}
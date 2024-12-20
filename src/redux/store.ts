import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

import { rootReducer } from "./rootReducer";

const persistConfig = {
	key: 'root',
	storage: storage,
	blacklist: ['user'],
}

const env = import.meta.env.VITE_APP_ENV;
const isInProduction = env === 'production' ? true : false;

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
	!isInProduction && logger,
];

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: false,
		}).concat(middlewares);
	},
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;


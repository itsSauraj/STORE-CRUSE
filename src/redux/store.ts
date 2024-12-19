import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./rootReducer";

const environment: String = import.meta.env.VITE_APP_ENV;
const inProduction: boolean = environment === 'production' ? true : false;

const persistConfig = {
	key: 'root',
	storage: storage,
	blacklist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

let middlewares: any[] = []

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

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./rootReducer";
import logger from "redux-logger";

const inProduction = import.meta.env.VITE_APP_ENV === 'production' ? true : false;

const persistConfig = {
	key: 'root',
	storage: storage,
	blacklist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware(
			{
				serializableCheck: false,
			}
		).concat(
			[!inProduction && logger].filter(Boolean)
		);
	},
});

export const persistor = persistStore(store);


import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./rootReducer";
import logger from "redux-logger";

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
		).concat(logger);
	},
});

export const persistor = persistStore(store);


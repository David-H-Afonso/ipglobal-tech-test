import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import popularMovies from './reducers/popularMovies'
import genres from './reducers/genres'
import guest from './reducers/guest'
import ratedMovies from './reducers/ratedMovies'

const persistConfig = {
	key: 'root',
	storage,
}

const reducer = combineReducers({
	popularMovies,
	ratedMovies,
	genres,
	guest,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)

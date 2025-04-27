import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // localStorage
import userReducer from './slices/userSlice'
import reposReducer from './slices/reposSlice'

const rootReducer = combineReducers({
  user: userReducer,
  repos: reposReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'repos']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)

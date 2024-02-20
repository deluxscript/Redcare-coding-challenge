import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { repositoriesReducer } from './slices/repositoriesSlice'

export const rootReducer = combineReducers({
  repositories: repositoriesReducer
})

export const setupStore = (preloadedState?: never) => configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {},
    }),
})

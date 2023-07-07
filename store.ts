import { configureStore } from '@reduxjs/toolkit'
import splashReducer from './Redux/SplashSlice'

export const store = configureStore({
  reducer: {
    splash: splashReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
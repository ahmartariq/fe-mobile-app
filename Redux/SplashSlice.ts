import { createSlice } from '@reduxjs/toolkit'
import { store } from '../store'

interface ThemeState {
    done: boolean
  }
  
  const initialState: ThemeState = {
    done: false,
  }
  
  const SplashSlice = createSlice({
    name: 'splash',
    initialState,
    reducers: {
      toggleSplash: (state) => {
        state.done = !state.done;
      },
      setSplash: (state, action) => {
        state.done = action.payload;
      },
    },
  })

  export const { toggleSplash, setSplash } = SplashSlice.actions;

  export default SplashSlice.reducer
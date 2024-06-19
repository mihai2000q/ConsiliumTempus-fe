import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./globalState.ts";

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setMode: state => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    setUserId: (state, action: PayloadAction<string | undefined>) => {
      state.userId = action.payload
    }
  }
})

export const { setMode, setUserId } = globalSlice.actions

export default globalSlice.reducer
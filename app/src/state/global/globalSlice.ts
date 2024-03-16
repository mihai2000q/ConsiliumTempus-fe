import { createSlice } from "@reduxjs/toolkit";
import { ThemeMode } from "../../theme.ts";

interface GlobalState {
  mode: ThemeMode
}

const initialState: GlobalState = {
  mode: 'dark'
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    }
  }
})

export const { setMode } = globalSlice.actions

export default globalSlice.reducer
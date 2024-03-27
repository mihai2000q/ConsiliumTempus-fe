import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./authState.ts";

export const authSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      localStorage.setItem("access_token", action.payload)
    },
    logout: state => {
      state.token = undefined
    }
  }
})

export const { setToken, logout } = authSlice.actions

export default authSlice.reducer
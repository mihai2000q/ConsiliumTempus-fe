import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./authState.ts";

export const authSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      localStorage.setItem("access_token", state.token)
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload
      localStorage.setItem("refresh_token", state.refreshToken)
    },
    logout: state => {
      state.token = null
      state.refreshToken = null
      //localStorage.removeItem("access_token")
      //localStorage.removeItem("refresh_token")
    }
  }
})

export const {
  setToken,
  setRefreshToken,
  logout
} = authSlice.actions

export default authSlice.reducer
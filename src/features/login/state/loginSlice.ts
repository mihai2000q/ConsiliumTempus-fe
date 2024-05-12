import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, LoginForm } from "./loginState.ts";

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginForm: (state, action: PayloadAction<LoginForm>) => {
      state.loginForm = action.payload
    }
  }
})

export const { setLoginForm } = loginSlice.actions

export default loginSlice.reducer
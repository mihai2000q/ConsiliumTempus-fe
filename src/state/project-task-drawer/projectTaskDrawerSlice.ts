import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./projectTaskDrawerState.ts";

export const projectTaskDrawerSlice = createSlice({
  name: 'projectTaskDrawer',
  initialState,
  reducers: {
    openDrawer: (state, action: PayloadAction<string>) => {
      state.taskId = action.payload
      state.isDrawerOpen = true
    },
    closeDrawer: (state) => {
      state.taskId = ''
      state.isDrawerOpen = false
    },
  }
})

export const {
  openDrawer,
  closeDrawer
} = projectTaskDrawerSlice.actions

export default projectTaskDrawerSlice.reducer
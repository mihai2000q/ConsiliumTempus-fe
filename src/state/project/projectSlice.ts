import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./projectState.ts";

export const projectSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setProjectSprintId: (state, action: PayloadAction<string | undefined>) => {
      state.sprintId = action.payload
    }
  }
})

export const { setProjectSprintId } = projectSlice.actions

export default projectSlice.reducer
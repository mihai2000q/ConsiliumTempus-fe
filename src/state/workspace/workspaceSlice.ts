import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./workspaceState.ts";

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setWorkspaceId: (state, action: PayloadAction<string>) => {
      state.workspaceId = action.payload
    },
  }
})

export const {
  setWorkspaceId,
} = workspaceSlice.actions

export default workspaceSlice.reducer
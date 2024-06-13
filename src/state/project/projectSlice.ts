import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, ProjectStatusesDialogState } from "./projectState.ts";

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectSprintId: (state, action: PayloadAction<string | undefined>) => {
      state.sprintId = action.payload
    },
    openProjectStatusesDialog: (state, action: PayloadAction<ProjectStatusesDialogState>) => {
      state.projectStatusesDialog = action.payload
    },
    closeProjectStatusesDialog: (state) => {
      state.projectStatusesDialog.isOpen = false
    }
  }
})

export const {
  setProjectSprintId,
  openProjectStatusesDialog,
  closeProjectStatusesDialog
} = projectSlice.actions

export default projectSlice.reducer
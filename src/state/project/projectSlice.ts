import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, ProjectStatusesDialogState } from "./projectState.ts";
import Breadcrumb from "../../types/Breadcrumb.ts";

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectId: (state, action: PayloadAction<string>) => {
      state.projectId = action.payload
    },
    setProjectName: (state, action: PayloadAction<string>) => {
      state.projectName = action.payload
    },
    setBreadcrumbs: (state, action: PayloadAction<Breadcrumb[]>) => {
      state.breadcrumbs = action.payload
    },
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
  setProjectId,
  setProjectName,
  setBreadcrumbs,
  setProjectSprintId,
  openProjectStatusesDialog,
  closeProjectStatusesDialog
} = projectSlice.actions

export default projectSlice.reducer
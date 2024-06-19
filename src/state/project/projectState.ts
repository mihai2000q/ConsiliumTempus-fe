import Breadcrumb from "../../types/Breadcrumb.ts";

interface ProjectState {
  projectId: string,
  projectName: string,
  sprintId: string | undefined,
  breadcrumbs: Breadcrumb[],
  projectStatusesDialog: ProjectStatusesDialogState,
  projectSprintsDialog: ProjectSprintsDialogState,
  addProjectSprintDialog: AddProjectSprintDialogState,
}

export interface ProjectStatusesDialogState {
  open: boolean,
  statusIdSelected: string | undefined,
}

export interface ProjectSprintsDialogState {
  open: boolean
}

export interface AddProjectSprintDialogState {
  open: boolean
}

export const initialState: ProjectState = {
  projectId: '',
  projectName: '',
  sprintId: undefined,
  breadcrumbs: [],
  projectStatusesDialog: {
    open: false,
    statusIdSelected: undefined,
  },
  projectSprintsDialog: {
    open: false
  },
  addProjectSprintDialog: {
    open: false
  }
}
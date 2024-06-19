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
  isOpen: boolean,
  statusIdSelected: string | undefined,
}

export interface ProjectSprintsDialogState {
  isOpen: boolean
}

export interface AddProjectSprintDialogState {
  isOpen: boolean
}

export const initialState: ProjectState = {
  projectId: '',
  projectName: '',
  sprintId: undefined,
  breadcrumbs: [],
  projectStatusesDialog: {
    isOpen: false,
    statusIdSelected: undefined,
  },
  projectSprintsDialog: {
    isOpen: false
  },
  addProjectSprintDialog: {
    isOpen: false
  }
}
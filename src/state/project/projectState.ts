interface ProjectState {
  sprintId: string | undefined,
  projectStatusesDialog: ProjectStatusesDialogState
}

export interface ProjectStatusesDialogState {
  isOpen: boolean,
  projectId: string | undefined,
  projectName: string | undefined,
  statusIdSelected: string | undefined,
}

export const initialState: ProjectState = {
  sprintId: undefined,
  projectStatusesDialog: {
    isOpen: false,
    projectId: undefined,
    projectName: undefined,
    statusIdSelected: undefined,
  }
}
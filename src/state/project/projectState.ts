import Breadcrumb from "../../types/Breadcrumb.ts";

interface ProjectState {
  projectId: string,
  projectName: string,
  sprintId: string | undefined,
  breadcrumbs: Breadcrumb[],
  projectStatusesDialog: ProjectStatusesDialogState
}

export interface ProjectStatusesDialogState {
  isOpen: boolean,
  statusIdSelected: string | undefined,
}

export const initialState: ProjectState = {
  projectId: '',
  projectName: '',
  sprintId: undefined,
  breadcrumbs: [],
  projectStatusesDialog: {
    isOpen: false,
    statusIdSelected: undefined,
  }
}
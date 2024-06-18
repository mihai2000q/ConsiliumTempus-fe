export interface AddProjectStatusDialogForm {
  projectStatusTitle: string,
  projectStatusDescription: string
}

export const projectStatusDialogFormInitialValues: AddProjectStatusDialogForm = {
  projectStatusTitle: "",
  projectStatusDescription: ""
}

export interface AddProjectSprintDialogForm {
  projectSprintName: string,
  keepPreviousStages: boolean,
  isProjectStatusAccordionOpen: boolean,
  projectStatusTitle: string,
  projectStatusDescription: string,
}

export const addProjectSprintDialogInitialValues: AddProjectSprintDialogForm = {
  projectSprintName: '',
  keepPreviousStages: true,
  isProjectStatusAccordionOpen: false,
  projectStatusTitle: '',
  projectStatusDescription: ''
}

export interface UpdateProjectSprintDialogForm {
  projectSprintName: string
}

export const updateProjectSprintDialogInitialValues: UpdateProjectSprintDialogForm = {
  projectSprintName: ''
}
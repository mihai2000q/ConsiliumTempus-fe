export interface AddProjectStatusDialogForm {
  projectStatusTitle: string,
  projectStatusDescription: string
}

export const addProjectStatusDialogFormInitialValues: AddProjectStatusDialogForm = {
  projectStatusTitle: "",
  projectStatusDescription: ""
}

export interface UpdateProjectStatusDialogForm {
  projectStatusTitle: string,
  projectStatusDescription: string
}

export const updateProjectStatusDialogFormInitialValues: UpdateProjectStatusDialogForm = {
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
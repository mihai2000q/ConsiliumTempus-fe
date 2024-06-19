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
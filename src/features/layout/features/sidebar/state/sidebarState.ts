export interface AddProjectDialogForm {
  projectName: string,
  description: string,
  workspaceId: string | undefined
}

export const addProjectDialogFormInitialValues: AddProjectDialogForm = {
  projectName: "",
  description: "",
  workspaceId: undefined
}

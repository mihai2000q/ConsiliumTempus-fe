export interface AddProjectDialogForm {
  projectName: string,
  workspaceId: string | undefined
}

export const addProjectDialogFormInitialValues: AddProjectDialogForm = {
  projectName: "",
  workspaceId: undefined
}

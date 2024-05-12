export interface AddProjectDialogForm {
  name: string,
  description: string,
  workspaceId: string | undefined
}

export const addProjectDialogFormInitialValues: AddProjectDialogForm = {
  name: "",
  description: "",
  workspaceId: undefined
}

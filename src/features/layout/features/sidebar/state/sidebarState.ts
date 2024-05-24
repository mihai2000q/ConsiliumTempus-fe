export interface AddProjectDialogForm {
  projectName: string,
  workspaceId: string | undefined
}

export const addProjectDialogFormInitialValues: AddProjectDialogForm = {
  projectName: "",
  workspaceId: undefined
}

export interface AddWorkspaceDialogForm {
  workspaceName: string
}

export const addWorkspaceDialogFormInitialValues: AddWorkspaceDialogForm = {
  workspaceName: ""
}

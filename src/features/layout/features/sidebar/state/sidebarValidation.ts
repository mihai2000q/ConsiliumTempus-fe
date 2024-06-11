import * as yup from "yup";

export const addProjectDialogSchema = yup.object().shape({
  projectName: yup
    .string()
    .required("Name is required"),
  workspaceId: yup
    .string()
    .required("Workspace is required"),
})

export const addWorkspaceDialogSchema = yup.object().shape({
  workspaceName: yup
    .string()
    .required("Name is required"),
})
import * as yup from "yup";

export const addProjectStatusDialogSchema = yup.object().shape({
  projectStatusDescription: yup
    .string()
    .required("Description is required"),
})

export const updateProjectStatusDialogSchema = yup.object().shape({
  projectStatusDescription: yup
    .string()
    .required("Description is required"),
})
import * as yup from "yup";

export const addProjectDialogSchema = yup.object().shape({
  projectName: yup
    .string()
    .required("Name is required"),
})
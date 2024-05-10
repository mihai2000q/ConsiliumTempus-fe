import * as yup from "yup";

export const addProjectDialogSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required"),
})
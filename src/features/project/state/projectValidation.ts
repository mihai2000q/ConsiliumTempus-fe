import * as yup from "yup";

export const projectStatusDialogSchema = yup.object().shape({
  projectStatusDescription: yup
    .string()
    .required("Description is required"),
})
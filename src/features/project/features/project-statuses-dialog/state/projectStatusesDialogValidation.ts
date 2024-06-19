import * as yup from "yup";

export const updateProjectStatusDialogSchema = yup.object().shape({
  projectStatusTitle: yup
    .string()
    .max(50, "Title must be at most 50 characters"),
  projectStatusDescription: yup
    .string()
    .required("Description is required"),
})
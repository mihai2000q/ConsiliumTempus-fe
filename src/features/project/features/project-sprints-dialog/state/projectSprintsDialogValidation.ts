import * as yup from "yup";

export const updateProjectSprintDialogValidationSchema = yup.object().shape({
  projectSprintName: yup
    .string()
    .required("Name is required")
    .max(50, 'Name must be at most 50 characters'),
})
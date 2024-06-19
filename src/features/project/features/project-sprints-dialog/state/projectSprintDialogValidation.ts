import * as yup from "yup";

export const updateProjectSprintDialogValidationSchema = yup.object().shape({
  projectSprintName: yup
    .string()
    .required("Name is required"),
})
import * as yup from "yup";

export const projectStatusDialogSchema = yup.object().shape({
  projectStatusDescription: yup
    .string()
    .required("Description is required"),
})

export const addProjectSprintDialogValidationSchema = yup.object().shape({
  projectSprintName: yup
    .string()
    .required("Name is required"),
  projectStatusDescription: yup
    .string()
    .required("Description is required"),
})

})
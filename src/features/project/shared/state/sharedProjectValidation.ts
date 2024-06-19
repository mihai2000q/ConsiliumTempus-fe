import * as yup from "yup";

export const addProjectSprintDialogValidationSchema = yup.object().shape({
  projectSprintName: yup
    .string()
    .required("Name is required"),
  isProjectStatusAccordionOpen: yup.boolean(),
  projectStatusDescription: yup
    .string()
    .when('isProjectStatusAccordionOpen', {
      is: true,
      then: (schema) => schema.required("Description is required"),
      otherwise: (schema) => schema
    })
})
import * as yup from "yup";

export const addProjectSprintDialogValidationSchema = yup.object().shape({
  projectSprintName: yup
    .string()
    .required("Name is required")
    .max(50, "Name must be at most 100 characters"),
  isProjectStatusAccordionOpen: yup.boolean(),
  projectStatusTitle: yup
    .string()
    .when('isProjectStatusAccordionOpen', {
      is: true,
      then: (schema) => schema
        .max(50, "Title must be at most 100 characters"),
      otherwise: (schema) => schema
    }),
  projectStatusDescription: yup
    .string()
    .when('isProjectStatusAccordionOpen', {
      is: true,
      then: (schema) => schema.required("Description is required"),
      otherwise: (schema) => schema
    })
})
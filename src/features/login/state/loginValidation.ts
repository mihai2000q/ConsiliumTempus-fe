import * as yup from 'yup'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid Email')
    .required('Email is required'),
  password: yup
    .string()
    .matches(passwordRegex, 'Invalid Password')
    .required('Password is required')
})

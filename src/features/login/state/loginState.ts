export interface LoginForm {
  email: string,
  password: string,
  rememberMe: boolean
}

export const loginFormInitialValues: LoginForm = {
  email: "",
  password: "",
  rememberMe: false
}
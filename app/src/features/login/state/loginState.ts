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

interface LoginState {
  loginForm: LoginForm
}

export const initialState: LoginState = {
  loginForm: loginFormInitialValues
}
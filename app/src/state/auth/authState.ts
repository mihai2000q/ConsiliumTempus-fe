interface AuthState {
  token: string | null
}

export const initialState: AuthState = {
  token: localStorage.getItem("access_token")
}
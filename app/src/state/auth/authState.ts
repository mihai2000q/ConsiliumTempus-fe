interface AuthState {
  token: string | null,
  refreshToken: string | null
}

export const initialState: AuthState = {
  token: localStorage.getItem("access_token"),
  refreshToken: localStorage.getItem("refresh_token")
}
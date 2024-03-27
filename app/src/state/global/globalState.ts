import { ThemeMode } from "../../theme.ts";

interface GlobalState {
  mode: ThemeMode
}

export const initialState: GlobalState = {
  mode: 'dark'
}
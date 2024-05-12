import { ThemeMode } from "../../theme/theme.ts";

interface GlobalState {
  mode: ThemeMode
}

export const initialState: GlobalState = {
  mode: 'dark'
}
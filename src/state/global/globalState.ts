import { ThemeMode } from "../../theme/theme.ts";

interface GlobalState {
  mode: ThemeMode,
  userId: string | undefined
}

export const initialState: GlobalState = {
  mode: 'dark',
  userId: undefined,
}
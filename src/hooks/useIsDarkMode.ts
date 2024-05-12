import { useSelector } from "react-redux";
import { RootState } from "../state/store.ts";

export default function useIsDarkMode() {
  const mode = useSelector((state: RootState) => state.global.mode)
  return mode === 'dark'
}
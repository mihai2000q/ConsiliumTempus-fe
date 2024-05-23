import { useState } from "react";
import useTimeoutCallback from "./useTimeoutCallback.ts";
import DependencyState from "../types/DependencyState.ts";

export default function useDependencyFacadeState<T>(initialValue: T): [
  DependencyState<T>,
  () => void,
  T,
  (newValue: T, isUser?: boolean | undefined) => void
] {
  const [state, setState] = useState<DependencyState<T>>({
    value: initialValue,
    isUser: false
  })
  const [facadeState, setFacadeState] = useState<DependencyState<T>>({
    value: initialValue,
    isUser: false
  })

  useTimeoutCallback(
    () => setState(facadeState),
    [facadeState],
  )

  const refreshIsUserState = () => {
    setState({ value: state.value, isUser: false })
  }

  const setNewFacadeState = (newValue: T, isUser: boolean | undefined) => {
    setFacadeState({ value: newValue as T, isUser: isUser ?? false })
  }

  return [state, refreshIsUserState, facadeState.value, setNewFacadeState]
}
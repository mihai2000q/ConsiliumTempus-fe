import { Dispatch, SetStateAction, useState } from "react";
import useTimeoutCallback from "./useTimeoutCallback.ts";

export default function useFacadeState<T>(initialValue: T): [T, T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialValue)
  const [facadeState, setFacadeState] = useState<T>(initialValue)

  useTimeoutCallback(
    () => setState(facadeState),
    [facadeState],
  )

  return [state, facadeState, setFacadeState]
}
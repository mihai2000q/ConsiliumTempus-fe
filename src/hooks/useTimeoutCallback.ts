import { useEffect } from "react";

interface TimeoutCallback {
  action: () => void,
  dependencies: unknown[],
  timeoutAfter?: number
}

export default function useTimeoutCallback({ action, dependencies, timeoutAfter = 500 }: TimeoutCallback) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      action()
    }, timeoutAfter);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, action]);
}
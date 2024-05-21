import { useEffect, useRef } from "react";

export default function useTimeoutCallbackSkipOnce(
  effect: () => void,
  dependencies: unknown[],
  timeoutAfter = 500
) {
  const isInitialMount = useRef(false);
  const skipOnce = useRef(true);

  useEffect(() => {
    isInitialMount.current = true
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    if (skipOnce.current) {
      skipOnce.current = false
      return
    }

    const timeoutId = setTimeout(() => {
      effect()
    }, timeoutAfter);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
import { useEffect, useRef } from "react";

export default function useDependencyOnceEffect(
  effect: () => void,
  dependency: unknown,
) {
  const isEffectRun = useRef(true);

  useEffect(() => {
    isEffectRun.current = false
  }, []);

  useEffect(() => {
    if (dependency !== undefined && !isEffectRun.current) {
      isEffectRun.current = true;
      effect()
    }
  }, [dependency]);
}
import { useEffect, useRef } from 'react'

export default function useTimeoutCallback(
  effect: () => void,
  dependencies: unknown[],
  timeoutAfter = 500
) {
  const isInitialMount = useRef(false)

  useEffect(() => {
    isInitialMount.current = true
  }, [])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    const timeoutId = setTimeout(() => {
      effect()
    }, timeoutAfter)

    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

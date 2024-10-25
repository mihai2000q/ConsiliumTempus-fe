import { useEffect, useRef } from 'react'

export default function useUpdateEffect(
  effect: () => void,
  dependencies: unknown[]
) {
  const isInitialMount = useRef(false)

  useEffect(() => {
    isInitialMount.current = true
  }, [])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

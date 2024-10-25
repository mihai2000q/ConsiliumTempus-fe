import { useState } from 'react'
import DependencyState from '../types/DependencyState.ts'

export default function useDependencyState<T>(initialValue: T): [
  DependencyState<T>,
  (newValue: T, isUser?: boolean | undefined) => void,
  () => void
] {
  const [state, setState] = useState<DependencyState<T>>({
    value: initialValue,
    isUser: false
  })

  const setNewState = (newValue: T, isUser: boolean | undefined) => {
    setState({ value: newValue as T, isUser: isUser ?? false })
  }

  const refreshState = () => {
    setState({ value: state.value as T, isUser: false })
  }

  return [state, setNewState, refreshState]
}

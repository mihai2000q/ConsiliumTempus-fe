export default interface DependencyState<T> {
  value: T,
  isUser: boolean
}

export function isNoneUserDependencyState(dependencyStates: DependencyState<unknown>[]): boolean {
  for (const dependencyState of dependencyStates)
    if (dependencyState.isUser)
      return false
  return true
}
import { useAppSelector } from '../state/store.ts'

export default function useAuth() {
  const token = useAppSelector(state => state.auth.token)
  return token !== null
}

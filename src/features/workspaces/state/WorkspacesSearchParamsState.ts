import { SearchParamsState } from '../../../hooks/useSearchParamsState.ts'

enum WorkspacesSearchParams {
  CurrentPage = 'p'
}

interface WorkspacesSearchParamsState {
  currentPage: number
}

const workspacesSearchParamsInitialState: WorkspacesSearchParamsState = {
  currentPage: 1
}

const workspacesSearchParamsSerializer = (state: WorkspacesSearchParamsState) => {
  const params = new URLSearchParams()
  params.set(WorkspacesSearchParams.CurrentPage, state.currentPage.toString())
  return params
}

const workspacesSearchParamsDeserializer = (params: URLSearchParams): WorkspacesSearchParamsState => {
  return {
    currentPage: Number(params.get(WorkspacesSearchParams.CurrentPage)) ?? 1
  }
}

const workspacesSearchParamsState: SearchParamsState<WorkspacesSearchParamsState> = {
  initialState: workspacesSearchParamsInitialState,
  serialize: workspacesSearchParamsSerializer,
  deserialize: workspacesSearchParamsDeserializer
}

export default workspacesSearchParamsState

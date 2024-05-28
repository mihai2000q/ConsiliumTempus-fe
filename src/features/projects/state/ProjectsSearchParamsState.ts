import { SearchParamsState } from "../../../hooks/useSearchParamsState.ts";

enum ProjectsSearchParams {
  CurrentPage = 'p'
}

interface ProjectsSearchParamsState {
  currentPage: number
}

const projectsSearchParamsInitialState: ProjectsSearchParamsState = {
  currentPage: 1
}

const projectsSearchParamsSerializer = (state: ProjectsSearchParamsState) => {
  const params = new URLSearchParams()
  params.set(ProjectsSearchParams.CurrentPage, state.currentPage.toString())
  return params
}

const projectsSearchParamsDeserializer = (params: URLSearchParams): ProjectsSearchParamsState => {
  return {
    currentPage: Number(params.get(ProjectsSearchParams.CurrentPage)) ?? 1,
  }
}

const projectsSearchParamsState: SearchParamsState<ProjectsSearchParamsState> = {
  initialState: projectsSearchParamsInitialState,
  serialize: projectsSearchParamsSerializer,
  deserialize: projectsSearchParamsDeserializer
}

export default projectsSearchParamsState;
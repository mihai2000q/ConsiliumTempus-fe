export default interface ProjectResponse {
  name: string,
  isFavorite: boolean,
  lifecycle: string,
  owner: UserResponse,
  isPrivate: boolean,
  latestStatus: ProjectStatusResponse | null,
  workspace: WorkspaceResponse
}

interface UserResponse {
  id: string,
  name: string,
  email: string
}

interface ProjectStatusResponse {
  id: string,
  title: string,
  status: string,
  createdDateTime: string,
  updatedDateTime: string,
  createdBy: UserResponse,
  updatedBy: UserResponse
}

interface WorkspaceResponse {
  id: string,
  name: string
}
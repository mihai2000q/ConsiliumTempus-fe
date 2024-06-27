export default interface GetProjectsResponse {
  projects: ProjectResponse[],
  totalCount: number
}

export interface ProjectResponse {
  id: string,
  name: string,
  description: string,
  isFavorite: boolean,
  lifecycle: string,
  owner: OwnerResponse,
  isPrivate: boolean,
  latestStatus: ProjectStatusResponse | null,
  createdDateTime: string
}

interface OwnerResponse {
  id: string,
  name: string,
  email: string
}

export interface ProjectStatusResponse {
  id: string,
  status: string,
  updatedDateTime: string
}
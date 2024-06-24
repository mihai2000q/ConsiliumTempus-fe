export interface GetProjectStatusesResponse {
  statuses: ProjectStatusResponse[],
  totalCount: number
}

export interface ProjectStatusResponse {
  id: string,
  title: string,
  status: string,
  description: string,
  createdDateTime: string,
  updatedDateTime: string,
  createdBy: UserResponse,
  updatedBy: UserResponse
}

interface UserResponse {
  id: string,
  name: string,
  email: string,
}

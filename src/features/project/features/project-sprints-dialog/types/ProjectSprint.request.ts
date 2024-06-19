export interface GetProjectSprintRequest {
  id: string
}

export interface GetProjectSprintsRequest {
  projectId: string
}

export interface UpdateProjectSprintRequest {
  id: string,
  name: string,
  startDate: string | undefined,
  endDate: string | undefined
}

export interface DeleteProjectSprintRequest {
  id: string
}
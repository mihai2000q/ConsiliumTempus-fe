export interface GetProjectSprintsRequest {
  projectId: string
}

export interface AddProjectSprintRequest {
  projectId: string,
  name: string,
  startDate: string | undefined,
  endDate: string | undefined,
  keepPreviousStages: boolean,
  projectStatus?: {
    title: string,
    status: string,
    description: string,
  }
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
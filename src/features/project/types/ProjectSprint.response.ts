export interface GetProjectSprintsResponse {
  sprints: ProjectSprintResponse[]
}

export interface ProjectSprintResponse {
  id: string,
  name: string,
  startDate?: string | null,
  endDate?: string | null,
}
export interface GetProjectSprintsResponse {
  sprints: ProjectSprintsResponse,
  totalCount: number
}

export type ProjectSprintsResponse = ProjectSprintResponse[]

interface ProjectSprintResponse {
  id: string,
  name: string,
  startDate: string | null,
  endDate: string | null,
  createdDateTime: string
}
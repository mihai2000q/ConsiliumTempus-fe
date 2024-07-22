export interface GetProjectTaskRequest {
  id: string
}

export interface UpdateOverviewProjectTaskRequest {
  id: string,
  name: string,
  description: string,
  assigneeId: string
}
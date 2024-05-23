export interface GetProjectTaskRequest {
  id: string
}

export interface UpdateProjectTaskRequest {
  id: string,
  name: string,
  description: string,
  assigneeId: string
}
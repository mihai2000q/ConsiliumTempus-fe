export interface GetProjectTaskRequest {
  id: string
}

export interface UpdateProjectTaskRequest {
  id: string,
  name: string,
  description: string,
  isCompleted: boolean,
  assigneeId: string | null
}

export interface DeleteProjectTaskRequest {
  id: string
}
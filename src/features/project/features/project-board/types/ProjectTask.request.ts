export interface GetProjectTasksQueryParameters {
  projectStageId: string
}

export interface AddProjectTaskRequest {
  projectStageId: string,
  name: string,
  onTop: boolean
}

export interface UpdateProjectTaskRequest {
  id: string,
  name: string,
  isCompleted: boolean,
  assigneeId: string | null
}

export interface DeleteProjectTaskRequest {
  id: string
}
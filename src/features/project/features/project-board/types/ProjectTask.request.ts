export interface GetProjectTasksQueryParameters {
  projectStageId: string,
  orderBy?: string[],
  search?: string[],
  currentPage?: number,
  pageSize?: number
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

export interface MoveProjectTaskRequest {
  sprintId: string,
  id: string,
  overId: string
}

export interface DeleteProjectTaskRequest {
  id: string,
  stageId: string
}
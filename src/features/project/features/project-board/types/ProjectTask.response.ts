export interface ProjectTaskResponse {
  tasks: ProjectTask[],
  totalCount: number
}

export interface ProjectTask {
  id: string,
  name: string,
  isCompleted: boolean,
  assignee: {
    id: string
  }
}
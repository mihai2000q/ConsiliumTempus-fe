export interface ProjectTaskResponse {
  tasks: ProjectTask[],
  totalCount: number
}

export interface ProjectTask {
  id: string,
  name: string,
  isCompleted: boolean,
  assignee: UserResponse | null
}

interface UserResponse {
  id: string,
  name: string,
  email: string,
}
import ProjectTask from './ProjectTask.model.ts'

export interface ProjectTaskResponse {
  tasks: ProjectTask[],
  totalCount: number
}

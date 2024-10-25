import Project from './Project.model.ts'

export default interface ProjectResponse {
  projects: Project[],
  totalCount: number
}

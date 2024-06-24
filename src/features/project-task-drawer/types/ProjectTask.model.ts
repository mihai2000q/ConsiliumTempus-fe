export default interface ProjectTask {
  name: string,
  description: string,
  isCompleted: boolean,
  assignee: Assignee | null,
  projectStage: ProjectStage,
  projectSprint: ProjectSprint,
  project: Project,
  workspace: Workspace,
}

export interface Assignee {
  id: string,
  name: string,
  email: string,
}

interface ProjectStage {
  id: string,
  name: string,
}

interface ProjectSprint {
  id: string,
  name: string,
  stages: ProjectStage[]
}

interface Project {
  id: string,
  name: string
}

interface Workspace {
  id: string,
  name: string,
}
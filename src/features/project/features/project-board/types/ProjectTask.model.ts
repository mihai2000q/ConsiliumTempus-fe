export default interface ProjectTask {
  id: string,
  name: string,
  isCompleted: boolean,
  assignee: Assignee | null
}

export interface Assignee {
  id: string,
  name: string,
  email: string,
}
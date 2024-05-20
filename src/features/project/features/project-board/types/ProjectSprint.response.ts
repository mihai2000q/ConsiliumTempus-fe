export interface ProjectSprintResponse {
  sprints: ProjectSprint[]
}

export interface ProjectSprint {
  id: string,
  name: string,
  startDate?: Date | null,
  endDate?: Date | null,
}
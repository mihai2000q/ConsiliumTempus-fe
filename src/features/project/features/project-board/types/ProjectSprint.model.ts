import ProjectStage from "./ProjectStage.model.ts";

export default interface ProjectSprint {
  id: string,
  name: string,
  startDate?: string | null,
  endDate?: string | null,
  stages: ProjectStage[]
}
import ProjectStage from "./ProjectStage.model.ts";

export default interface ProjectSprint {
  id: string,
  name: string,
  startDate?: Date | null,
  endDate?: Date | null,
  stages: ProjectStage[]
}
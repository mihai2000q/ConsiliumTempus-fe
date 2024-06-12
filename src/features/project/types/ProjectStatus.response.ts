import ProjectStatus from "./ProjectStatus.model.ts";

export interface GetProjectStatusesResponse {
  statuses: ProjectStatus[],
  totalCount: number
}

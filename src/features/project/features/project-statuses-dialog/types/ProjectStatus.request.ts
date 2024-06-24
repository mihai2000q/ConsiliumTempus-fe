import ProjectStatusType from "../../../../../utils/project/ProjectStatusType.ts";

export interface GetStatusesFromProjectRequest {
  id: string
}

export interface UpdateStatusFromProjectRequest {
  id: string,
  statusId: string,
  title: string,
  status: ProjectStatusType,
  description: string
}

export interface RemoveStatusFromProjectRequest {
  id: string,
  statusId: string
}
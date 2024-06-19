import ProjectStatusType from "../../../utils/project/ProjectStatusType.ts";
import ProjectLifecycle from "../../../utils/project/ProjectLifecycle.ts";

export interface GetProjectRequest {
  id: string
}

export interface GetStatusesFromProjectRequest {
  id: string
}

export interface AddStatusToProjectRequest {
  id: string,
  title: string,
  status: ProjectStatusType,
  description: string
}

export interface UpdateProjectRequest {
  id: string,
  name: string,
  lifecycle: ProjectLifecycle,
  isFavorite: boolean
}

export interface UpdateStatusFromProjectRequest {
  id: string,
  statusId: string,
  title: string,
  status: ProjectStatusType,
  description: string
}

export interface DeleteProjectRequest {
  id: string
}

export interface RemoveStatusFromProjectRequest {
  id: string,
  statusId: string
}


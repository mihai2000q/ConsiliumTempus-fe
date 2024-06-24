import ProjectLifecycle from "../../../utils/project/ProjectLifecycle.ts";

export interface GetProjectRequest {
  id: string
}

export interface UpdateProjectRequest {
  id: string,
  name: string,
  lifecycle: ProjectLifecycle,
  isFavorite: boolean
}

export interface DeleteProjectRequest {
  id: string
}
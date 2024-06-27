import ProjectLifecycle from "../../../../../utils/project/ProjectLifecycle.ts";

export interface GetProjectsQueryParameters {
  workspaceId: string,
  pageSize: number,
  currentPage: number,
  orderBy?: string[] | undefined,
  search?: string[] | undefined,
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

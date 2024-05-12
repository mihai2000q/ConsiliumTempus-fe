import Project from "./Project.model.ts";

export default interface ProjectResponse {
  projects: Project[],
  totalCount: number,
  totalPages: number | null
}

export interface GetProjectsQueryParameters {
  pageSize: number,
  currentPage: number,
  order: string,
  name: string | null,
}

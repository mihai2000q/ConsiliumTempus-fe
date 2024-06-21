export type GetProjectsRequest = {
  orderBy?: string[] | undefined,
  search?: string[] | undefined,
  pageSize?: number,
  currentPage?: number,
}

export type CreateProjectRequest = {
  workspaceId: string,
  name: string
}
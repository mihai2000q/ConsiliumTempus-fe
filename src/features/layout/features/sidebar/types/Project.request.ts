export type GetProjectsRequest = {
  orderBy?: string[] | undefined,
  search?: string[] | undefined,
}

export type CreateProjectRequest = {
  workspaceId: string,
  name: string
}
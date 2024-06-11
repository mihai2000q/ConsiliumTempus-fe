export type GetProjectsRequest = {
  orderBy?: string[] | undefined
}

export type CreateProjectRequest = {
  workspaceId: string,
  name: string
}
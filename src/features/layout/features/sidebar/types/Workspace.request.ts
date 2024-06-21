export interface GetWorkspacesRequest {
  isPersonalWorkspaceFirst: boolean,
  orderBy?: string[] | undefined,
  pageSize?: number,
  currentPage?: number,
}

export interface CreateWorkspaceRequest {
  name: string
}
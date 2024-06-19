export interface GetWorkspacesRequest {
  isPersonalWorkspaceFirst: boolean,
  orderBy?: string[] | undefined
}

export interface CreateWorkspaceRequest {
  name: string
}
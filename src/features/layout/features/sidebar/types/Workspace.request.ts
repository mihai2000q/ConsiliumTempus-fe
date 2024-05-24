export interface GetWorkspacesRequest {
  isPersonalWorkspaceFirst: boolean,
  order?: string
}

export interface CreateWorkspaceRequest {
  name: string
}
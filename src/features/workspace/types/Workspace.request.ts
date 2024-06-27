export interface GetWorkspaceRequest {
  id: string
}

export interface UpdateWorkspaceRequest {
  id: string,
  name: string,
  isFavorite: boolean
}

export interface DeleteWorkspaceRequest {
  id: string
}
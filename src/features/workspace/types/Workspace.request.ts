export interface GetWorkspaceRequest {
  id: string
}

export interface UpdateWorkspaceRequest {
  id: string,
  name: string
}

export interface UpdateFavoritesWorkspaceRequest {
  id: string,
  isFavorite: boolean
}

export interface DeleteWorkspaceRequest {
  id: string
}
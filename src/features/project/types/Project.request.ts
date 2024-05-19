export interface GetProjectQueryParameters {
  id: string
}

export interface UpdateProjectRequest {
  id: string,
  name: string,
  isFavorite: boolean
}
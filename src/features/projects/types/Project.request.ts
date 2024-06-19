export interface GetProjectsQueryParameters {
  pageSize: number,
  currentPage: number,
  orderBy?: string[] | undefined,
  search?: string[] | undefined,
}
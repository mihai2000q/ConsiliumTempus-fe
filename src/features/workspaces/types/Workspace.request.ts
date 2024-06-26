export interface GetWorkspacesQueryParameters {
  pageSize: number,
  currentPage: number,
  orderBy?: string[] | undefined,
  search?: string[] | undefined,
}
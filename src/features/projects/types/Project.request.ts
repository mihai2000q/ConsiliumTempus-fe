export interface GetProjectsQueryParameters {
  pageSize: number,
  currentPage: number,
  order: string,
  name: string | null,
}
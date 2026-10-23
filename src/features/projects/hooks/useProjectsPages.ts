import Project from '../types/Project.model.ts'
import CollectionResponse from '../../../types/responses/Collection.response.ts'

export default function useProjectsPages(
  data: CollectionResponse<'projects', Project> | undefined,
  pageSize: number,
  currentPage: number
): [number, number, number] {
  const totalPages = data ? Math.ceil(data.totalCount / pageSize) : 0

  const startCount = data?.totalCount === 0
    ? 0
    : currentPage === 1
      ? 1
      : pageSize * (currentPage - 1)

  const endCount = data
    ? data.totalCount === 0
      ? 0
      : currentPage === totalPages
        ? data.totalCount
        : currentPage * pageSize
    : 0

  return [startCount, endCount, totalPages]
}

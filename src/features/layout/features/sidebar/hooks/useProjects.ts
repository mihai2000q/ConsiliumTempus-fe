import { useEffect, useRef, useState } from "react";
import Project from "../types/Project.model.ts";
import { useGetProjectsQuery, useLazyGetProjectsQuery } from "../state/sidebarApi.ts";
import useUpdateEffect from "../../../../../hooks/useUpdateEffect.ts";
import ProjectsOrderQueryParams from "../utils/ProjectsOrderQueryParams.ts";
import OrderType from "../../../../../utils/OrderType.ts";
import ProjectLifecycle from "../../../../../utils/project/ProjectLifecycle.ts";
import useSearchQueryParam from "../../../../../hooks/useSearchQueryParam.ts";
import ProjectsSearchQueryParams from "../utils/ProjectsSearchQueryParams.ts";
import FilterOperator from "../../../../../utils/FilterOperator.ts";

export default function useProjects(
  hidden: boolean,
  order: ProjectsOrderQueryParams,
  lifecycle: ProjectLifecycle | null
): [
  projects: Project[],
  isFetching: boolean,
  increaseCurrentPage: (() => void) | undefined
] {
  const pageSize = 5

  const [getProjects, { isFetching }] = useLazyGetProjectsQuery()

  const [projects, setProjects] = useState<Project[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const orderType = order === ProjectsOrderQueryParams.Name ? OrderType.Ascending : OrderType.Descending
  const orderBy = [order + '.' + orderType]

  const [searchQueryParam, addToSearchQueryParam] = useSearchQueryParam()
  useEffect(() => {
    addToSearchQueryParam({
      property: ProjectsSearchQueryParams.Lifecycle,
      operator: FilterOperator.Equal,
      value: lifecycle
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lifecycle]);

  // meant to be triggered only on cache invalidation and on startup to replace the data
  const currentPageInner = useRef(1)
  useEffect(() => {
    currentPageInner.current = currentPage
  }, [currentPage]);
  const { data: initialData, isFetching: isInitialFetching } = useGetProjectsQuery(
    {
      orderBy: orderBy,
      search: searchQueryParam,
      currentPage: 1,
      pageSize: currentPageInner.current * pageSize
    },
    { skip: hidden }
  )
  useEffect(() => {
    if (initialData) {
      setProjects([...initialData.projects])
      setTotalCount(initialData.totalCount)
    }
  }, [initialData])

  // meant to be triggered only when the current page changes to add more to the data
  useUpdateEffect(() => {
    if (hidden) {
      setTotalCount(0)
      setProjects([])
      return
    }

    if (currentPage === 1) return

    getProjects(
      {
        orderBy: orderBy,
        search: searchQueryParam,
        currentPage: currentPage,
        pageSize: pageSize
      },
      true
    ).then(res => {
      setProjects([...projects, ...res.data?.projects ?? []])
      setTotalCount(res.data?.totalCount ?? 0)
    })
  }, [currentPage, getProjects, hidden]);

  return [
    projects,
    isFetching || isInitialFetching,
    totalCount > projects.length
      ? () => setCurrentPage((prev) => prev + 1)
      : undefined // return undefined to stop displaying the Show More button
  ]
}
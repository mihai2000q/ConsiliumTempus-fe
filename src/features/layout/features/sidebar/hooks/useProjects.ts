import { useEffect, useMemo, useRef, useState } from "react";
import Project from "../types/Project.model.ts";
import { useGetProjectsQuery, useLazyGetProjectsQuery } from "../state/sidebarApi.ts";
import ProjectsOrderQueryParams from "../utils/ProjectsOrderQueryParams.ts";
import OrderType from "../../../../../utils/enums/OrderType.ts";
import ProjectLifecycle from "../../../../../utils/project/ProjectLifecycle.ts";
import useSearchQueryParam from "../../../../../hooks/useSearchQueryParam.ts";
import ProjectsSearchQueryParams from "../utils/ProjectsSearchQueryParams.ts";
import FilterOperator from "../../../../../utils/enums/FilterOperator.ts";

export default function useProjects(
  hidden: boolean,
  order: ProjectsOrderQueryParams,
  lifecycle: ProjectLifecycle | null
): {
  projects: Project[] | undefined,
  projectsIsFetching: boolean,
  projectsFetchMoreProjects: (() => void) | undefined
} {
  const pageSize = 5

  const [getProjects, { isFetching: isLazyFetching }] = useLazyGetProjectsQuery()

  const [projects, setProjects] = useState<Project[] | undefined>(undefined)
  const [totalCount, setTotalCount] = useState(0)

  const orderType = order === ProjectsOrderQueryParams.Name ? OrderType.Ascending : OrderType.Descending
  const orderSearchQueryParam = useMemo(() => [order + '.' + orderType], [order, orderType])

  const [searchQueryParam, addToSearchQueryParam] = useSearchQueryParam()
  useEffect(() => {
    addToSearchQueryParam({
      property: ProjectsSearchQueryParams.Lifecycle,
      operator: FilterOperator.Equal,
      value: lifecycle
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lifecycle]);

  const currentPage = useRef(1)

  const { data, isFetching } = useGetProjectsQuery(
    {
      orderBy: orderSearchQueryParam,
      search: searchQueryParam,
      currentPage: 1,
      pageSize: currentPage.current * pageSize
    },
    { skip: hidden }
  )
  useEffect(() => {
    if(data) {
      setProjects([...data.projects])
      setTotalCount(data.totalCount)
    }
  }, [data]);

  useEffect(() => {
    if (hidden) {
      setTotalCount(0)
      setProjects([])
    }
  }, [hidden]);

  const fetchMoreProjects = () => {
    currentPage.current++

    getProjects(
      {
        orderBy: orderSearchQueryParam,
        search: searchQueryParam,
        currentPage: currentPage.current,
        pageSize: pageSize
      },
      true
    ).then(res => {
      setProjects([...projects ?? [], ...res.data?.projects ?? []])
      setTotalCount(res.data?.totalCount ?? 0)
    })
  }

  return {
    projects,
    projectsIsFetching: isLazyFetching || isFetching,
    projectsFetchMoreProjects: totalCount > (projects?.length ?? 0)
      ? fetchMoreProjects
      : undefined // return undefined to stop displaying the Show More button
  }
}
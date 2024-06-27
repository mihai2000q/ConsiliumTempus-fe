import { useGetProjectsQuery, useLazyGetProjectsQuery } from "../state/workspaceProjectsApi.ts";
import ProjectAdapter from "../adapters/Project.adapter.ts";
import Project from "../type/Project.model.ts";
import ProjectLifecycle from "../../../../../utils/project/ProjectLifecycle.ts";
import { useEffect, useRef, useState } from "react";
import useSearchQueryParam from "../../../../../hooks/useSearchQueryParam.ts";
import FilterOperator from "../../../../../utils/enums/FilterOperator.ts";
import ProjectsSearchQueryParams from "../utils/ProjectsSearchQueryParams.ts";

export default function useProjects(
  workspaceId: string,
  orderByQueryParam: string[],
  lifecycle: ProjectLifecycle | null
): {
  projects: Project[] | undefined,
  isFetching: boolean,
  fetchMore: (() => void) | undefined
} {
  const pageSize = 7

  const [getProjects, { isFetching: isLazyFetching }] = useLazyGetProjectsQuery()

  const [projects, setProjects] = useState<Project[] | undefined>(undefined)
  const [totalCount, setTotalCount] = useState(0)

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

  const { data } = useGetProjectsQuery({
    workspaceId: workspaceId,
    orderBy: orderByQueryParam,
    search: searchQueryParam,
    currentPage: 1,
    pageSize: currentPage.current * pageSize
  })
  useEffect(() => {
    if(data) {
      setProjects([...ProjectAdapter.adapt(data.projects)!])
      setTotalCount(data.totalCount)
    }
  }, [data]);

  const fetchMoreProjects = () => {
    currentPage.current++

    getProjects(
      {
        workspaceId: workspaceId,
        orderBy: orderByQueryParam,
        search: searchQueryParam,
        currentPage: currentPage.current,
        pageSize: pageSize
      },
      true
    ).then(res => {
      setProjects([...projects ?? [], ...ProjectAdapter.adapt(res.data?.projects) ?? []])
      setTotalCount(res.data?.totalCount ?? 0)
    })
  }

  return {
    projects,
    isFetching: isLazyFetching,
    fetchMore: totalCount > (projects?.length ?? 0) ? fetchMoreProjects : undefined
  }
}
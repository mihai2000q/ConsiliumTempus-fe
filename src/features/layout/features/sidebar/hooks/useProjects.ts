import { useEffect, useRef, useState } from "react";
import Project from "../types/Project.model.ts";
import { useGetProjectsQuery, useLazyGetProjectsQuery } from "../state/sidebarApi.ts";
import useUpdateEffect from "../../../../../hooks/useUpdateEffect.ts";

export default function useProjects(
  hidden: boolean
): [
  projects: Project[],
  isFetching: boolean,
  increaseCurrentPage: (() => void) | undefined
] {
  const orderBy = ['last_activity.desc']
  const search = ['lifecycle eq active']
  const pageSize = 5

  const [getProjects, { isFetching }] = useLazyGetProjectsQuery()

  const [projects, setProjects] = useState<Project[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  // meant to be triggered only on cache invalidation
  const currentPageInner = useRef(1)
  const { data: initialData } = useGetProjectsQuery(
    {
      orderBy: orderBy,
      search: search,
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
        search: search,
        currentPage: currentPage,
        pageSize: pageSize
      },
      true
    ).then(res => {
      setProjects([...projects, ...res.data?.projects ?? []])
      setTotalCount(res.data?.totalCount ?? 0)
      currentPageInner.current++
    })
  }, [currentPage, getProjects, hidden]);

  return [
    projects,
    isFetching,
    totalCount > projects.length
      ? () => setCurrentPage((prev) => prev + 1)
      : undefined // return undefined to stop displaying the Show More button
  ]
}
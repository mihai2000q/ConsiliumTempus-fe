import { useEffect, useRef, useState } from "react";
import ProjectTask from "../types/ProjectTask.model.ts";
import { useGetProjectTasksQuery, useLazyGetProjectTasksQuery } from "../state/projectBoardApi.ts";
import { setProjectTasksOnStage } from "../../../../../state/project-board/projectBoardSlice.ts";
import { useAppDispatch, useAppSelector } from "../../../../../state/store.ts";

export default function useProjectTasks(
  stageId: string,
  orderSearchQueryParam: string[] | undefined,
  searchQueryParam: string[] | undefined
): {
  tasks: ProjectTask[] | undefined,
  totalTasksCount: number | undefined,
  isFetching: boolean,
  isLoading: boolean,
  fetchMoreTasks: () => void
} {
  const dispatch = useAppDispatch()

  const pageSize = 10

  const [getProjectTasks, { isFetching: isLazyFetching }] = useLazyGetProjectTasksQuery()

  const [tasks, setTasks] = useState<ProjectTask[] | undefined>(undefined)
  const [totalCount, setTotalCount] = useState(0)

  const currentPage = useRef(1)

  const { data, isFetching, isLoading } = useGetProjectTasksQuery({
    projectStageId: stageId,
    orderBy: orderSearchQueryParam,
    search: searchQueryParam,
    currentPage: 1,
    pageSize: currentPage.current * pageSize
  })
  useEffect(() => {
    if(data) {
      setTasks([...data.tasks])
      setTotalCount(data.totalCount)
    }
  }, [data]);

  const fetchMoreTasks = () => {
    if (isLazyFetching || totalCount === (tasks?.length ?? 0)) return

    currentPage.current++

    getProjectTasks(
      {
        projectStageId: stageId,
        orderBy: orderSearchQueryParam,
        search: searchQueryParam,
        currentPage: currentPage.current,
        pageSize: pageSize
      },
      true
    ).then(res => {
      setTasks([...tasks ?? [], ...res.data?.tasks ?? []])
      setTotalCount(res.data?.totalCount ?? 0)
    })
  }

  useEffect(() => {
    dispatch(setProjectTasksOnStage({
      id: stageId,
      tasks: tasks
    }))
  }, [dispatch, stageId, tasks]);

  const stateTasks = useAppSelector(state => state.projectBoard.projectStages
    .find(ps => ps.id === stageId)?.tasks)

  return {
    tasks: stateTasks,
    totalTasksCount: totalCount,
    isFetching: isLazyFetching || isFetching,
    isLoading,
    fetchMoreTasks
  }
}
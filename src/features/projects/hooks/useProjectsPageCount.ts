import { useEffect, useState } from "react";
import ProjectResponse from "../types/Project.response.ts";

export default function useProjectsPageCount(
  data: ProjectResponse | undefined,
  pageSize: number,
  currentPage: number,
): [number, number] {
  const [startCount, setStartCount] = useState(0)
  useEffect(() => {
    setStartCount( data?.totalCount === 0 ? 0 : currentPage === 1 ? 1 : pageSize * (currentPage - 1))
  }, [data, pageSize, currentPage]);

  const [endCount, setEndCount] = useState(0)
  useEffect(() => {
    if (data)
      setEndCount(data.totalCount === 0
        ? 0
        : currentPage === Math.ceil(data.totalCount / pageSize)
          ? data.totalCount
          : currentPage * pageSize)
  }, [pageSize, data, currentPage]);

  return [startCount, endCount]
}
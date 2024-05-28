import { useEffect, useState } from "react";
import ProjectResponse from "../types/Project.response.ts";

export default function useProjectsPageCount(
  data: ProjectResponse | undefined,
  pageSize: number,
  currentPage: number,
): [number, number] {
  const [startCount, setStartCount] = useState(0)
  useEffect(() => {
    setStartCount(currentPage === 1 ? 1 : pageSize * (currentPage - 1))
  }, [pageSize, currentPage]);

  const [endCount, setEndCount] = useState(0)
  useEffect(() => {
    if (data)
      setEndCount(currentPage === data.totalPages ? data.totalCount : currentPage * pageSize)
  }, [pageSize, data, currentPage]);

  return [startCount, endCount]
}
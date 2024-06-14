import FilterOperator from "../../../utils/FilterOperator.ts";
import ProjectsSearchQueryParams from "./ProjectsSearchQueryParams.ts";

export const projectsSearchQueryParamsFilterOperators =
  new Map<string, FilterOperator[]>()

projectsSearchQueryParamsFilterOperators.set(
  ProjectsSearchQueryParams.IsPrivate,
  [FilterOperator.Equal, FilterOperator.NotEqual]
)

projectsSearchQueryParamsFilterOperators.set(
  ProjectsSearchQueryParams.LatestStatus,
  [FilterOperator.Equal, FilterOperator.NotEqual]
)
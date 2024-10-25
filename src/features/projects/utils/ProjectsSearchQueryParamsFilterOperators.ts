import FilterOperator from '../../../utils/enums/FilterOperator.ts'
import ProjectsSearchQueryParams from './ProjectsSearchQueryParams.ts'

export const projectsSearchQueryParamsFilterOperators =
  new Map<string, FilterOperator[]>()

const eqAndNeq = [FilterOperator.Equal, FilterOperator.NotEqual]
const others = [
  FilterOperator.Equal, FilterOperator.NotEqual,
  FilterOperator.GreaterThan, FilterOperator.GreaterThanOrEqual,
  FilterOperator.LessThan, FilterOperator.LessThanOrEqual
]

projectsSearchQueryParamsFilterOperators.set(ProjectsSearchQueryParams.IsPrivate, eqAndNeq)
projectsSearchQueryParamsFilterOperators.set(ProjectsSearchQueryParams.LatestStatus, eqAndNeq)
projectsSearchQueryParamsFilterOperators.set(ProjectsSearchQueryParams.LastActivity, others)
projectsSearchQueryParamsFilterOperators.set(ProjectsSearchQueryParams.CreatedDateTime, others)
projectsSearchQueryParamsFilterOperators.set(ProjectsSearchQueryParams.UpdatedDateTime, others)

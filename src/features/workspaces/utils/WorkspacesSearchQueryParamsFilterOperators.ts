import FilterOperator from '../../../utils/enums/FilterOperator.ts'
import WorkspacesSearchQueryParams from './WorkspacesSearchQueryParams.ts'

export const workspacesSearchQueryParamsFilterOperators =
  new Map<string, FilterOperator[]>()

const eqAndNeq = [FilterOperator.Equal, FilterOperator.NotEqual]
const others = [
  FilterOperator.Equal, FilterOperator.NotEqual,
  FilterOperator.GreaterThan, FilterOperator.GreaterThanOrEqual,
  FilterOperator.LessThan, FilterOperator.LessThanOrEqual
]

workspacesSearchQueryParamsFilterOperators.set(WorkspacesSearchQueryParams.IsPersonal, eqAndNeq)
workspacesSearchQueryParamsFilterOperators.set(WorkspacesSearchQueryParams.LastActivity, others)
workspacesSearchQueryParamsFilterOperators.set(WorkspacesSearchQueryParams.CreatedDateTime, others)
workspacesSearchQueryParamsFilterOperators.set(WorkspacesSearchQueryParams.UpdatedDateTime, others)

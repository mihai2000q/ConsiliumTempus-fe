import FilterOperator from '../utils/enums/FilterOperator.ts'
import SearchQueryParamValue from './SearchQueryParamValue.ts'
import FilterPropertyValueType from '../utils/enums/FilterPropertyValueType.ts'

export interface Filter {
  property: string,
  operator: FilterOperator,
  value: SearchQueryParamValue,
  valueType: FilterPropertyValueType
}

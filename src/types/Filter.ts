import FilterOperator from "../utils/FilterOperator.ts";
import SearchQueryParamValue from "./SearchQueryParamValue.ts";
import FilterPropertyValueType from "../utils/FilterPropertyValueType.ts";

export interface Filter {
  property: string,
  operator: FilterOperator,
  value: SearchQueryParamValue,
  valueType: FilterPropertyValueType
}
import FilterOperator from "../utils/FilterOperator.ts";
import SearchQueryParamValue from "./SearchQueryParamValue.ts";

export interface Filter {
  property: string,
  operator: FilterOperator,
  value: SearchQueryParamValue
}
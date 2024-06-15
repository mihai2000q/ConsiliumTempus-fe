import { ReactNode } from "react";
import FilterOperator from "../utils/FilterOperator.ts";
import SearchQueryParamValue from "./SearchQueryParamValue.ts";
import FilterPropertyValueType from "../utils/FilterPropertyValueType.ts";

export default interface FilterProperty {
  icon: ReactNode,
  property: string,
  defaultOperator: FilterOperator,
  defaultValue: SearchQueryParamValue,
  valueType: FilterPropertyValueType,
  title: string
}
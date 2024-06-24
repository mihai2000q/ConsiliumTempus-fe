import { ReactNode } from "react";
import FilterOperator from "../utils/enums/FilterOperator.ts";
import SearchQueryParamValue from "./SearchQueryParamValue.ts";
import FilterPropertyValueType from "../utils/enums/FilterPropertyValueType.ts";

export default interface FilterProperty {
  icon: ReactNode,
  property: string,
  defaultOperator: FilterOperator,
  defaultValue: SearchQueryParamValue,
  valueType: FilterPropertyValueType,
  title: string
}
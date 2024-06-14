import { ReactNode } from "react";
import FilterOperator from "../utils/FilterOperator.ts";
import SearchQueryParamValue from "./SearchQueryParamValue.ts";

export default interface FilterMenuItem {
  icon: ReactNode,
  property: string,
  defaultOperator: FilterOperator,
  defaultValue: SearchQueryParamValue,
  title: string
}
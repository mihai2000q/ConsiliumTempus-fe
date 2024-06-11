import { useState } from "react";
import FilterOperator from "../utils/FilterOperator.ts";

type SearchQueryParamValue = string | boolean | number | null;

export default function useSearchQueryParam(): [
  string[],
  (property: string, operator: FilterOperator, value: SearchQueryParamValue) => void
] {
  const propertyOperators: Map<string, SearchQueryParamValue> = new Map<string, SearchQueryParamValue>()

  const [searchQueryParam, setSearchQueryParam] = useState<string[]>([])

  const addToSearch = (property: string, operator: FilterOperator, value: SearchQueryParamValue) => {
    propertyOperators.set(JSON.stringify({ property, operator: operator }), value)

    const newParams: string[] = []
    propertyOperators.forEach((value, key) => {
      if (value !== null) {
        const propertyOperator = JSON.parse(key)
        newParams.push(`${propertyOperator.property} ${propertyOperator.operator} ${value}`)
      }
    })
    setSearchQueryParam(newParams)
  }

  return [searchQueryParam, addToSearch]
}
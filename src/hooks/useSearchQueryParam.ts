import { useState } from "react";
import SearchQueryParamValue from "../types/SearchQueryParamValue.ts";
import { Filter } from "../types/Filter.ts";

export default function useSearchQueryParam(): [
  string[],
  (filter: Filter) => void,
  (filter: Filter) => void
] {
  const propertyOperators: Map<string, SearchQueryParamValue> = new Map<string, SearchQueryParamValue>()

  const [searchQueryParam, setSearchQueryParam] = useState<string[]>([])

  function createSearchQueryParam() {
    const newParams: string[] = []
    propertyOperators.forEach((value, key) => {
      if (value !== null) {
        const propertyOperator = JSON.parse(key)
        newParams.push(`${propertyOperator.property} ${propertyOperator.operator} ${value}`)
      }
    })
    setSearchQueryParam(newParams)
  }

  const addToSearch = (filter: Filter) => {
    const key = JSON.stringify({ property: filter.property, operator: filter.operator })
    propertyOperators.set(key, filter.value)
    createSearchQueryParam()
  }

  const removeFromSearch = (filter: Filter) => {
    const key = JSON.stringify({ property: filter.property, operator: filter.operator })
    propertyOperators.delete(key)
    createSearchQueryParam()
  }

  return [searchQueryParam, addToSearch, removeFromSearch]
}
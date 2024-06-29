import { useRef, useState } from "react";
import SearchQueryParamValue from "../types/SearchQueryParamValue.ts";
import FilterOperator from "../utils/enums/FilterOperator.ts";
import { Filter } from "../types/Filter.ts";

interface FilterSearchQueryParam {
  property: string,
  operator: FilterOperator,
  value: SearchQueryParamValue,
}

export type addToSearchQueryParamType = (filter: FilterSearchQueryParam | Filter) => void
export type removeFromSearchQueryParamType = (filter: FilterSearchQueryParam | Filter) => void

export default function useSearchQueryParam(initialFilter: FilterSearchQueryParam | null = null): [
  searchQueryParam: string[],
  addToSearchQueryParam:  addToSearchQueryParamType,
  removeFromSearchQueryParam: removeFromSearchQueryParamType
] {
  const propertyOperators = useRef(new Map<string, SearchQueryParamValue>(
    initialFilter
      ? [[createKey(initialFilter), initialFilter.value as SearchQueryParamValue]]
      : []
  ))
  const [searchQueryParam, setSearchQueryParam] =
    useState<string[]>(initialFilter
      ? [`${initialFilter.property} ${initialFilter.operator} ${initialFilter.value}`]
      : []
    )

  function createSearchQueryParam() {
    const newParams: string[] = []
    propertyOperators.current.forEach((value, key) => {
      if (value !== null) {
        const propertyOperator = JSON.parse(key)
        newParams.push(`${propertyOperator.property} ${propertyOperator.operator} ${value}`)
      }
    })
    setSearchQueryParam(newParams)
  }

  const addToSearch = (filter: FilterSearchQueryParam | Filter) => {
    const key = createKey(filter)
    propertyOperators.current.set(key, filter.value)
    createSearchQueryParam()
  }

  const removeFromSearch = (filter: FilterSearchQueryParam | Filter) => {
    const key = createKey(filter)
    propertyOperators.current.delete(key)
    createSearchQueryParam()
  }

  return [searchQueryParam, addToSearch, removeFromSearch]
}

function createKey(filter: Filter | FilterSearchQueryParam): string {
  return JSON.stringify({ property: filter.property, operator: filter.operator })
}
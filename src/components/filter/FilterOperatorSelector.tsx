import FilterOperator from "../../utils/enums/FilterOperator.ts";
import { MenuItem } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import FilterSelector from "./FilterSelector.tsx";

interface FilterOperatorSelectorProps {
  filterOperators: FilterOperator[],
  operator: FilterOperator,
  setOperator: Dispatch<SetStateAction<FilterOperator>>,
  availableOperators: FilterOperator[]
}

function FilterOperatorSelector({
  filterOperators,
  availableOperators,
  operator,
  setOperator,
}: FilterOperatorSelectorProps) {
  const filterOperatorToDisplay = new Map<FilterOperator, string>()
  filterOperatorToDisplay.set(FilterOperator.Equal, '=')
  filterOperatorToDisplay.set(FilterOperator.NotEqual, '≠')
  filterOperatorToDisplay.set(FilterOperator.GreaterThan, '>')
  filterOperatorToDisplay.set(FilterOperator.GreaterThanOrEqual, '≥')
  filterOperatorToDisplay.set(FilterOperator.LessThan, '<')
  filterOperatorToDisplay.set(FilterOperator.LessThanOrEqual, '≤')
  filterOperatorToDisplay.set(FilterOperator.Contains, 'Contains')
  filterOperatorToDisplay.set(FilterOperator.StartsWith, 'Starts With')

  return (
    <FilterSelector
      value={operator}
      onChange={(o) => setOperator(o as FilterOperator)}>
      {availableOperators.map((o) => (
        <MenuItem
          key={o}
          value={o}
          disabled={filterOperators.some(op => op === o)}>
          {filterOperatorToDisplay.get(o) ?? 'Not known'}
        </MenuItem>
      ))}
    </FilterSelector>
  );
}

export default FilterOperatorSelector;
import FilterOperator from "../../utils/FilterOperator.ts";
import { MenuItem, Select } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

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
  filterOperatorToDisplay.set(FilterOperator.GreaterThanOrEqual, '>=')
  filterOperatorToDisplay.set(FilterOperator.LessThan, '<')
  filterOperatorToDisplay.set(FilterOperator.LessThanOrEqual, '<=')
  filterOperatorToDisplay.set(FilterOperator.Contains, 'Contains')
  filterOperatorToDisplay.set(FilterOperator.StartsWith, 'Starts With')

  return (
    <Select
      size={'small'}
      value={operator}
      onChange={(e) => setOperator(e.target.value as FilterOperator)}>
      {availableOperators.map((o) => (
        <MenuItem
          key={o}
          value={o}
          disabled={filterOperators.some(op => op === o)}>
          {filterOperatorToDisplay.get(o) ?? 'Not known'}
        </MenuItem>
      ))}
    </Select>
  );
}

export default FilterOperatorSelector;
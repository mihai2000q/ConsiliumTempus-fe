import { useState } from 'react';
import { projectFilterPropertiesData } from "../../features/projects/data/ProjectFilterPropertiesData.tsx";
import FilterPropertySelector from "./FilterPropertySelector.tsx";
import FilterOperator from "../../utils/FilterOperator.ts";
import { IconButton, Stack, Tooltip } from "@mui/material";
import FilterOperatorSelector from "./FilterOperatorSelector.tsx";
import FilterValueSelector from "./FilterValueSelector.tsx";
import { Close } from "@mui/icons-material";
import { Filter } from "../../types/Filter.ts";
import useUpdateEffect from "../../hooks/useUpdateEffect.ts";

interface FilterPropertyProps {
  initialFilter: Filter,
  filters: Filter[],
  operatorsMap: Map<string, FilterOperator[]>,
  index: number,
  handleFilter: (index: number, filter: Filter) => void,
  removeFilter: (index: number, filter: Filter) => void
}

function FilterProperty({
  initialFilter,
  filters,
  operatorsMap,
  index,
  handleFilter,
  removeFilter
}: FilterPropertyProps) {
  const [property, setProperty] = useState(initialFilter.property)
  const [operator, setOperator] = useState(initialFilter.operator)
  const [value, setValue] = useState(initialFilter.value)
  useUpdateEffect(() => {
    handleFilter(index, { property, operator, value })
  }, [property, operator, value]);

  function handleRemoveFilter() {
    removeFilter(index, { property, operator, value })
  }

  return (
    <Stack direction={'row'} spacing={1} alignItems={'center'}>
      <FilterPropertySelector
        data={projectFilterPropertiesData}
        filters={filters}
        operatorsMap={operatorsMap}
        property={property}
        setProperty={setProperty} />
      <FilterOperatorSelector
        filterOperators={filters.filter(f => f.property === property).map(f => f.operator)}
        operator={operator}
        setOperator={setOperator}
        availableOperators={operatorsMap.get(property) ?? []} />
      <FilterValueSelector
        value={value}
        setValue={setValue}  />
      <Tooltip
        arrow
        placement={'top'}
        title={'Remove Filter'}>
        <IconButton variant={'circular'} size={'small'} onClick={handleRemoveFilter}>
          <Close fontSize={'small'} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

export default FilterProperty;
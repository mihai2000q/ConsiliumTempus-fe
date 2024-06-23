import { useState } from 'react';
import FilterPropertySelector from "./FilterPropertySelector.tsx";
import FilterOperator from "../../utils/FilterOperator.ts";
import { IconButton, Stack, Tooltip } from "@mui/material";
import FilterOperatorSelector from "./FilterOperatorSelector.tsx";
import FilterValueSelector from "./FilterValueSelector.tsx";
import { Close } from "@mui/icons-material";
import { Filter } from "../../types/Filter.ts";
import useUpdateEffect from "../../hooks/useUpdateEffect.ts";
import { default as FilterPropertyType } from "../../types/FilterProperty.ts";

interface FilterPropertyProps {
  filterProperties: FilterPropertyType[],
  operatorsMap: Map<string, FilterOperator[]>,
  initialFilter: Filter,
  filters: Filter[],
  index: number,
  handleFilter: (index: number, filter: Filter) => void,
  removeFilter: (filter: Filter) => void
}

function FilterProperty({
  filterProperties,
  operatorsMap,
  initialFilter,
  filters,
  index,
  handleFilter,
  removeFilter
}: FilterPropertyProps) {
  const [property, setProperty] = useState(initialFilter.property)
  const [operator, setOperator] = useState(initialFilter.operator)
  const [value, setValue] = useState(initialFilter.value)
  const [valueType, setValueType] = useState(initialFilter.valueType)
  useUpdateEffect(() => {
    handleFilter(index, { property, operator, value, valueType })
  }, [property, operator, value, valueType])

  function handleRemoveFilter() {
    removeFilter({ property, operator, value, valueType })
  }

  function setPropertyAndReset(newProperty: string) {
    const currentOperatorsOnProperty = filters
      .filter(f => f.property === newProperty)
      .map(f => f.operator)

    const filterProperty = filterProperties.find(d => d.property === newProperty)
    if (!filterProperty) return

    const newOperator = currentOperatorsOnProperty.includes(filterProperty.defaultOperator)
      ? operatorsMap.get(newProperty)?.find(o => !currentOperatorsOnProperty.includes(o))
      : operatorsMap.get(newProperty)?.includes(operator)
        ? operator
        : filterProperty.defaultOperator

    if (!newOperator) return

    const newValue = filterProperty.valueType === valueType
      ? value
      : filterProperty.defaultValue

    setOperator(newOperator)
    setProperty(newProperty)
    setValue(newValue)
    setValueType(filterProperty.valueType)
  }
  
  const filterOperators = filters.filter(f => f.property === property).map(f => f.operator)

  return (
    <Stack direction={'row'} spacing={1} alignItems={'center'}>
      <FilterPropertySelector
        filterProperties={filterProperties}
        filters={filters}
        operatorsMap={operatorsMap}
        property={property}
        setProperty={setPropertyAndReset} />
      <FilterOperatorSelector
        filterOperators={filterOperators}
        operator={operator}
        setOperator={setOperator}
        availableOperators={operatorsMap.get(property) ?? []} />
      <FilterValueSelector
        type={valueType}
        value={value}
        setValue={setValue}  />
      <Tooltip
        arrow
        enterDelay={500}
        placement={'top'}
        title={'Remove Filter'}>
        <IconButton variant={'circular'} size={'small'} onClick={handleRemoveFilter}>
          <Close sx={{ fontSize: 17, m: '1px' }} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

export default FilterProperty;
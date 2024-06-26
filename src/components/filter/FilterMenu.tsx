import { useEffect, useState } from 'react';
import { Button, Collapse, Menu, Stack, Typography } from "@mui/material";
import FilterChip from "./FilterChip.tsx";
import { AddRounded } from "@mui/icons-material";
import FilterPropertyMenu from "./property/FilterPropertyMenu.tsx";
import { Filter } from "../../types/Filter.ts";
import { addToSearchQueryParamType, removeFromSearchQueryParamType } from "../../hooks/useSearchQueryParam.ts";
import FilterOperator from "../../utils/enums/FilterOperator.ts";
import { default as FilterPropertyModel } from "../../types/FilterProperty.ts";
import FilterChipItem from "../../types/FilterChipItem.ts";
import FilterProperty from "./property/FilterProperty.tsx";

interface FilterMenuProps {
  anchorEl: HTMLElement | null,
  onClose: () => void,
  addToSearchQueryParam: addToSearchQueryParamType
  removeFromSearchQueryParam: removeFromSearchQueryParamType,
  filterChips: FilterChipItem[],
  filterProperties: FilterPropertyModel[],
  operatorsMap: Map<string, FilterOperator[]>,
  onSizeChange?: (size: number) => void
}

function FilterMenu({
  anchorEl,
  onClose,
  addToSearchQueryParam,
  removeFromSearchQueryParam,
  filterChips,
  filterProperties,
  operatorsMap,
  onSizeChange
}: FilterMenuProps) {
  const [filterPropertiesMenuAnchorEl, setFilterPropertiesMenuAnchorEl] =
    useState<HTMLElement | null>(null)

  const [filters, setFilters] = useState<Filter[]>([])
  useEffect(() => {
    if (onSizeChange) onSizeChange(filters.length)
  }, [filters.length, onSizeChange]);

  function handleClear() {
    filters.forEach(f => removeFromSearchQueryParam(f))
    setFilters([])
  }

  function handleRemoveFilter(filter: Filter) {
    const filterToRemove = filters.find(f =>
      f.property === filter.property &&
      f.operator === filter.operator &&
      f.value === filter.value
    )
    if (!filterToRemove) return

    setFilters(filters.filter((f => f !== filterToRemove)))
    removeFromSearchQueryParam(filter)
  }

  function handleRemoveFilters(filtersToRemove: Filter[]) {
    const f: Filter[] = []
    filtersToRemove.forEach(ff =>{
      const filterToRemove = filters.find(f =>
        f.property === ff.property &&
        f.operator === ff.operator &&
        f.value === ff.value
      )
      if (filterToRemove) f.push(filterToRemove)
    })

    setFilters(filters.filter((ff => !f.includes(ff))))
    filtersToRemove.forEach(removeFromSearchQueryParam)
  }

  function handleFilter(index: number, filter: Filter) {
    removeFromSearchQueryParam(filters.filter((_, i) => i === index)[0])
    setFilters(filters.map((f, i) => i === index ? filter : f))
    addToSearchQueryParam(filter)
  }

  function handleAddFilter(filter: Filter) {
    setFilters([...filters, filter])
    addToSearchQueryParam(filter)
  }

  function handleAddFilters(f: Filter[]) {
    setFilters([...filters, ...f])
    f.forEach(addToSearchQueryParam)
  }
  
  return (
    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}>
      <Stack pt={2} pb={1} px={3} width={550}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography fontSize={16}>Filters</Typography>
          <Button variant={'alt-text'} size={'small'} disabled={filters.length === 0} onClick={handleClear}>
            Clear
          </Button>
        </Stack>

        <Stack spacing={1} my={3}>
          <Typography color={'text.secondary'}>Quick Filters</Typography>
          <Stack flexWrap={"wrap"} direction={'row'} alignItems={'center'} gap={1}>
            {filterChips.map((chip) => (
              <FilterChip
                { ...chip }
                key={chip.title}
                allFilters={filters}
                handleFilters={handleAddFilters}
                removeFilters={handleRemoveFilters} />
            ))}
          </Stack>
        </Stack>

        <Collapse in={filters.length > 0}>
          <Stack spacing={1} mb={3}>
            <Typography color={'text.secondary'}>All Filters</Typography>
            <Stack spacing={1}>
              {filters.map((filter, index) => (
                <Collapse key={JSON.stringify(filter)} in={true}>
                  <FilterProperty
                    filterProperties={filterProperties}
                    operatorsMap={operatorsMap}
                    initialFilter={filter}
                    index={index}
                    filters={filters}
                    handleFilter={handleFilter}
                    removeFilter={handleRemoveFilter} />
                </Collapse>
              ))}
            </Stack>
          </Stack>
        </Collapse>

        <Button
          variant={'alt-text'}
          startIcon={<AddRounded />}
          onClick={(e) => setFilterPropertiesMenuAnchorEl(e.currentTarget)}
          sx={{ alignSelf: 'start' }}>
          Add Filter
        </Button>
        <FilterPropertyMenu
          filterProperties={filterProperties}
          filters={filters}
          operatorsMap={operatorsMap}
          handleFilter={handleAddFilter}
          menuAnchorEl={filterPropertiesMenuAnchorEl}
          onClose={() => setFilterPropertiesMenuAnchorEl(null)} />
      </Stack>
    </Menu>
  );
}

export default FilterMenu;
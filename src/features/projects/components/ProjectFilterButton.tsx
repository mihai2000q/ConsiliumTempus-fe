import { AddRounded, FilterAlt } from "@mui/icons-material";
import { Badge, Button, Collapse, Menu, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { projectFilterPropertiesData } from "../data/ProjectFilterPropertiesData.tsx";
import FilterChip from "../../../components/filter/FilterChip.tsx";
import FilterPropertyMenu from "../../../components/filter/FilterPropertyMenu.tsx";
import FilterProperty from "../../../components/filter/FilterProperty.tsx";
import { projectsSearchQueryParamsFilterOperators } from "../utils/ProjectsSearchQueryParamsFilterOperators.ts";
import { Filter } from "../../../types/Filter.ts";
import { projectFilterChipsData } from "../data/ProjectFilterChipsData.tsx";

interface ProjectFilterButtonProps {
  addToSearchQueryParam: (filter: Filter) => void,
  removeFromSearchQueryParam: (filter: Filter) => void
}

function ProjectFilterButton({
  addToSearchQueryParam,
  removeFromSearchQueryParam
} : ProjectFilterButtonProps) {
  const [menuAnchorEl, setMenuAnchorEl] =
    useState<HTMLElement | null>(null)
  const handleCloseMenu = () => setMenuAnchorEl(null)

  const [filterPropertiesMenuAnchorEl, setFilterPropertiesMenuAnchorEl] =
    useState<HTMLElement | null>(null)

  const [filters, setFilters] = useState<Filter[]>([])

  function handleClear() {
    filters.forEach(f => removeFromSearchQueryParam(f))
    setFilters([])
  }

  function handleRemoveFilter(index: number, filter: Filter) {
    setFilters(filters.filter((_, i) => i !== index))
    removeFromSearchQueryParam(filter)
  }

  function handleRemoveChipFilter(filter: Filter) {
    const chipFilter = filters.find(f =>
      f.property === filter.property &&
      f.operator === filter.operator &&
      f.value === filter.value
    )
    if (!chipFilter) return

    setFilters(filters.filter((_, i) => i !== filters.indexOf(chipFilter)))
    removeFromSearchQueryParam(filter)
  }

  function handleFilter(index: number, filter: Filter) {
    setFilters(filters.map((f, i) => i === index ? filter : f))
    addToSearchQueryParam(filter)
  }

  function handleAddFilter(filter: Filter) {
    setFilters([...filters, filter])
    addToSearchQueryParam(filter)
  }

  return (
    <>
      <Badge badgeContent={filters.length} color={'primary'}>
        <Button
          variant={'outlined'}
          startIcon={<FilterAlt />}
          onClick={(e) => setMenuAnchorEl(e.currentTarget)}
          sx={{ boxShadow: 4 }}>
          Filter
      </Button>
      </Badge>

      <Menu open={Boolean(menuAnchorEl)} anchorEl={menuAnchorEl} onClose={handleCloseMenu}>
        <Stack pt={2} pb={1} px={3} width={550}>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography fontSize={16}>Filters</Typography>
            <Button variant={'alt-text'} size={'small'} disabled={filters.length === 0} onClick={handleClear}>
              Clear
            </Button>
          </Stack>

          <Stack spacing={1} my={3}>
            <Typography color={'text.secondary'}>Quick Filters</Typography>
            <Stack flexWrap={"wrap"} direction={'row'} alignItems={'center'} spacing={1}>
              {projectFilterChipsData.map((chip) => (
                <FilterChip
                  { ...chip }
                  key={chip.title}
                  filters={filters}
                  handleFilter={handleAddFilter}
                  removeFilter={handleRemoveChipFilter} />
              ))}
            </Stack>
          </Stack>

          <Collapse in={filters.length > 0}>
            <Stack spacing={1} mb={3}>
              <Typography color={'text.secondary'}>All Filters</Typography>
              <Stack spacing={1}>
                {filters.map((filter, index) => (
                  <Collapse key={index} in={true}>
                    <FilterProperty
                      initialFilter={filter}
                      operatorsMap={projectsSearchQueryParamsFilterOperators}
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
            data={projectFilterPropertiesData}
            filters={filters}
            operatorsMap={projectsSearchQueryParamsFilterOperators}
            handleFilter={handleAddFilter}
            menuAnchorEl={filterPropertiesMenuAnchorEl}
            onClose={() => setFilterPropertiesMenuAnchorEl(null)} />
        </Stack>
      </Menu>
    </>
  );
}

export default ProjectFilterButton;
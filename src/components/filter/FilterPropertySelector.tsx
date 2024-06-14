import { Dispatch, ReactNode, SetStateAction } from "react";
import { ListItemIcon, MenuItem, Select, Typography } from "@mui/material";
import FilterMenuItem from "../../types/FilterMenuItem.ts";
import FilterOperator from "../../utils/FilterOperator.ts";
import { Filter } from "../../types/Filter.ts";

interface FiltersActionsMenuItemProps {
  icon: ReactNode,
  children: ReactNode,
  disabled: boolean,
  selected: boolean,
  value: string,
}

const FilterPropertyMenuItem = ({
  icon,
  children,
  disabled,
  selected,
  value
} : FiltersActionsMenuItemProps) => (
  <MenuItem
    value={value}
    selected={selected}
    disabled={disabled}
    sx={{
      '& .MuiListItemIcon-root': {
        minWidth: 0,
        mr: 0.75,
        '& .MuiSvgIcon-root': {
          fontSize: 18
        }
      }
    }}>
    <ListItemIcon>{icon}</ListItemIcon>
    <Typography pt={0.5}>{children}</Typography>
  </MenuItem>
)

interface PropertySelectorProps {
  data: FilterMenuItem[],
  filters: Filter[],
  operatorsMap: Map<string, FilterOperator[]>,
  property: string,
  setProperty: Dispatch<SetStateAction<string>>
}

function FilterPropertySelector({
  data,
  filters,
  operatorsMap,
  property,
  setProperty,
}: PropertySelectorProps) {
  // DOES NOT WORK WHEN CHANGING PROPERTIES
  return (
    <Select
      size={'small'}
      value={property}
      onChange={(e) => setProperty(e.target.value)}>
      {data.map((d) => (
        <FilterPropertyMenuItem
          key={d.property}
          icon={d.icon}
          selected={property === d.property}
          disabled={filters.filter(f => f.property === d.property).length === operatorsMap.get(d.property)?.length || property === d.property}
          value={d.property}>
          {d.title}
        </FilterPropertyMenuItem>
      ))}
    </Select>
  )
}

export default FilterPropertySelector
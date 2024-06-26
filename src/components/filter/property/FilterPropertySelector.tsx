import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import FilterProperty from "../../../types/FilterProperty.ts";
import FilterOperator from "../../../utils/enums/FilterOperator.ts";
import { Filter } from "../../../types/Filter.ts";
import FilterSelector from "../FilterSelector.tsx";

interface PropertySelectorProps {
  filterProperties: FilterProperty[],
  filters: Filter[],
  operatorsMap: Map<string, FilterOperator[]>,
  property: string,
  setProperty: (property: string) => void
}

function FilterPropertySelector({
  filterProperties,
  filters,
  operatorsMap,
  property,
  setProperty,
}: PropertySelectorProps) {
  const filtersWithProperty = (fp: FilterProperty) => {
    return filters.filter(f => f.property === fp.property)
  }
  const isFiltersWithPropertySameSizeWithOperatorsMap = (fp: FilterProperty) => {
    return filtersWithProperty(fp).length === operatorsMap.get(fp.property)?.length
  }
  const disabled = (fp: FilterProperty) => {
    return isFiltersWithPropertySameSizeWithOperatorsMap(fp) || property === fp.property
  }

  return (
    <FilterSelector
      value={property}
      onChange={setProperty}
      sx={{
        '& .MuiSelect-select': { p: '2px 14px' },
        '& .MuiListItemIcon-root': { display: 'none' }
      }}>
      {filterProperties.map((fp) => (
        <MenuItem
          key={fp.property}
          value={fp.property}
          selected={property === fp.property}
          disabled={disabled(fp)}
          sx={{
            '& .MuiListItemIcon-root': {
              minWidth: 0,
              mr: 0.75,
              '& .MuiSvgIcon-root': { fontSize: 18 }
            }
          }}>
          <ListItemIcon>{fp.icon}</ListItemIcon>
          <ListItemText sx={{ pt: 0.5 }}>{fp.title}</ListItemText>
        </MenuItem>
      ))}
    </FilterSelector>
  )
}

export default FilterPropertySelector
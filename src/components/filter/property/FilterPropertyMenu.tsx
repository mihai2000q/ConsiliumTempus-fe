import { ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'
import FilterProperty from '../../../types/FilterProperty.ts'
import { MouseEventHandler, ReactNode } from 'react'
import { Filter } from '../../../types/Filter.ts'
import FilterOperator from '../../../utils/enums/FilterOperator.ts'

interface FiltersActionsMenuItemProps {
  icon: ReactNode,
  children: ReactNode,
  disabled: boolean,
  onClick?: MouseEventHandler<HTMLLIElement> | undefined,
}

const FilterPropertyMenuItem = ({
                                  onClick,
                                  icon,
                                  children,
                                  disabled
                                }: FiltersActionsMenuItemProps) => (
  <MenuItem
    disabled={disabled}
    onClick={onClick}
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

interface FilterPropertyMenuProps {
  filters: Filter[],
  operatorsMap: Map<string, FilterOperator[]>,
  filterProperties: FilterProperty[],
  handleFilter: (filter: Filter) => void,
  menuAnchorEl: HTMLElement | null,
  onClose: () => void
}

function FilterPropertyMenu({
                              filterProperties,
                              filters,
                              operatorsMap,
                              menuAnchorEl,
                              handleFilter,
                              onClose
                            }: FilterPropertyMenuProps) {
  function handleClick(filterProperty: FilterProperty) {
    const defaultOperator = filters
      .filter(f => f.property === filterProperty.property)
      .map(f => f.operator)
      .find(o => o === filterProperty.defaultOperator)

    handleFilter({
      property: filterProperty.property,
      operator: defaultOperator
        ? operatorsMap.get(filterProperty.property)!.find(o => o !== defaultOperator)!
        : filterProperty.defaultOperator,
      value: filterProperty.defaultValue,
      valueType: filterProperty.valueType
    })
    onClose()
  }

  const isDisabled = (property: string) => {
    return filters.filter(x => x.property === property).length === operatorsMap.get(property)?.length
  }

  return (
    <Menu open={Boolean(menuAnchorEl)} anchorEl={menuAnchorEl} onClose={onClose}>
      {filterProperties.map((fp) => (
        <FilterPropertyMenuItem
          key={fp.property}
          disabled={isDisabled(fp.property)}
          icon={fp.icon}
          onClick={() => handleClick(fp)}>
          {fp.title}
        </FilterPropertyMenuItem>
      ))}
    </Menu>
  )
}

export default FilterPropertyMenu

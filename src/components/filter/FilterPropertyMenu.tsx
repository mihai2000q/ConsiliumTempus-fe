import { ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import FilterMenuItem from "../../types/FilterMenuItem.ts";
import { MouseEventHandler, ReactNode } from "react";
import { Filter } from "../../types/Filter.ts";
import FilterOperator from "../../utils/FilterOperator.ts";

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
} : FiltersActionsMenuItemProps) => (
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
  data: FilterMenuItem[],
  handleFilter: (filter: Filter) => void,
  menuAnchorEl: HTMLElement | null,
  onClose: () => void
}

function FilterPropertyMenu({
  filters,
  operatorsMap,
  data,
  menuAnchorEl,
  handleFilter,
  onClose
}: FilterPropertyMenuProps) {
  function handleClick(filterMenuItem: FilterMenuItem) {
    const defaultOperator = filters
      .filter(f => f.property === filterMenuItem.property)
      .map(f => f.operator)
      .find(o => o === filterMenuItem.defaultOperator)

    handleFilter({
      property: filterMenuItem.property,
      operator: defaultOperator
        ? operatorsMap.get(filterMenuItem.property)!.find(o => o !== defaultOperator)!
        : filterMenuItem.defaultOperator,
      value: filterMenuItem.defaultValue
    })
    onClose()
  }

  return (
    <Menu open={Boolean(menuAnchorEl)} anchorEl={menuAnchorEl} onClose={onClose}>
      {data.map((f) => (
        <FilterPropertyMenuItem
          key={f.property}
          disabled={filters.filter(x => x.property === f.property).length === operatorsMap.get(f.property)?.length}
          icon={f.icon}
          onClick={() => handleClick(f)}>
          {f.title}
        </FilterPropertyMenuItem>
      ))}
    </Menu>
  );
}

export default FilterPropertyMenu;
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack } from "@mui/material";
import { Check, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import ProjectsOrderQueryParams from "../utils/ProjectsOrderQueryParams.ts";
import OrderType from "../../../../../utils/enums/OrderType.ts";
import { projectOrderProperties } from "../data/ProjectOrderPropertiesData.tsx";

interface ProjectsOrderMenuItemProps {
  children: ReactNode,
  selected: boolean,
  onClick: () => void
}

const ProjectsOrderMenuItem = ({ selected, onClick, children } : ProjectsOrderMenuItemProps) => (
  <MenuItem
    selected={selected}
    onClick={onClick}
    sx={{
      '& .MuiSvgIcon-root': { fontSize: 17 },
      '& .MuiListItemIcon-root': { minWidth: 23, }
    }}>
    <ListItemIcon>{selected && <Check />}</ListItemIcon>
    <ListItemText sx={{ pt: 0.3 }}>{children}</ListItemText>
  </MenuItem>
)

interface WorkspaceProjectsSortMenuProps {
  setOrderByQueryParam: Dispatch<SetStateAction<string[]>>,
  anchorEl: HTMLElement | null,
  onClose: () => void
}

function WorkspaceProjectsSortMenu({
  setOrderByQueryParam,
  anchorEl,
  onClose
}: WorkspaceProjectsSortMenuProps) {
  const [order, setOrder] = 
    useState(ProjectsOrderQueryParams.Name)
  const [orderType, setOrderType] =
    useState(OrderType.Ascending)
  
  useEffect(() => {
    setOrderByQueryParam([`${order}.${orderType}`])
  }, [order, orderType, setOrderByQueryParam])
  
  return (
    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}>
      <Stack direction={'row'} justifyContent={'space-evenly'}>
        <IconButton
          variant={'circular'}
          disabled={orderType === OrderType.Ascending}
          onClick={() => setOrderType(OrderType.Ascending)}>
          <KeyboardArrowUp />
        </IconButton>
        <IconButton
          variant={'circular'}
          disabled={orderType === OrderType.Descending}
          onClick={() => setOrderType(OrderType.Descending)}>
          <KeyboardArrowDown />
        </IconButton>
      </Stack>
      {projectOrderProperties.map(op => (
        <ProjectsOrderMenuItem key={op.value} selected={op.value === order} onClick={() => setOrder(op.value)}>
          {op.displayName}
        </ProjectsOrderMenuItem>
      ))}
    </Menu>
  );
}

export default WorkspaceProjectsSortMenu;
import { Divider, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem } from "@mui/material";
import { projectOrderProperties } from "../data/ProjectOrderPropertiesData.tsx";
import { Dispatch, ReactNode, SetStateAction } from "react";
import ProjectsOrderQueryParams from "../utils/ProjectsOrderQueryParams.ts";
import { Check } from "@mui/icons-material";
import ProjectLifecycle from "../../../../../utils/project/ProjectLifecycle.ts";

interface ProjectsMenuItemProps {
  children: ReactNode,
  selected: boolean,
  onClick: () => void
}

const ProjectsMenuItem = ({ selected, onClick, children } : ProjectsMenuItemProps) => (
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

interface SidebarProjectsMenuProps {
  anchorEl: HTMLElement | null,
  onClose: () => void,
  order: ProjectsOrderQueryParams,
  setOrder: Dispatch<SetStateAction<ProjectsOrderQueryParams>>,
  lifecycle: ProjectLifecycle | null,
  setLifecycle: Dispatch<SetStateAction<ProjectLifecycle | null>>
}

function SidebarProjectsMenu({
  anchorEl,
  onClose,
  order,
  setOrder,
  lifecycle,
  setLifecycle
}: SidebarProjectsMenuProps) {
  function handleOrderClick(newOrder: string) {
    setOrder(newOrder as ProjectsOrderQueryParams)
  }

  return (
    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}>
      <ListSubheader sx={{ lineHeight: 0, p: '12px 17px 16px 17px', fontSize: '12px' }}>
        Filters
      </ListSubheader>
      <ProjectsMenuItem selected={lifecycle === null} onClick={() => setLifecycle(null)}>
        Show All
      </ProjectsMenuItem>
      {Object.values(ProjectLifecycle).map(l => (
        <ProjectsMenuItem key={l} selected={l === lifecycle} onClick={() => setLifecycle(l)}>
          {l}
        </ProjectsMenuItem>
      ))}
      <Divider />
      <ListSubheader sx={{ lineHeight: 0, p: '12px 17px 16px 17px', fontSize: '12px' }}>
        Orders
      </ListSubheader>
      {projectOrderProperties.map(op => (
        <ProjectsMenuItem key={op.value} selected={op.value === order} onClick={() => handleOrderClick(op.value)}>
          {op.displayName}
        </ProjectsMenuItem>
      ))}
    </Menu>
  );
}

export default SidebarProjectsMenu;
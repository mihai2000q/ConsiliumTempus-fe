import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Check } from "@mui/icons-material";
import ProjectLifecycle from "../../../../../utils/project/ProjectLifecycle.ts";

interface ProjectsFilterMenuItemProps {
  children: ReactNode,
  selected: boolean,
  onClick: () => void
}

const ProjectsFilterMenuItem = ({ selected, onClick, children } : ProjectsFilterMenuItemProps) => (
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

interface WorkspaceProjectsFilterMenuProps {
  lifecycle: ProjectLifecycle | null,
  setLifecycle: Dispatch<SetStateAction<ProjectLifecycle | null>>,
  anchorEl: HTMLElement | null,
  onClose: () => void
}

function WorkspaceProjectsFilterMenu({
  anchorEl,
  onClose,
  lifecycle,
  setLifecycle
}: WorkspaceProjectsFilterMenuProps) {
  return (
    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}>
      <ProjectsFilterMenuItem selected={lifecycle === null} onClick={() => setLifecycle(null)}>
        Show All
      </ProjectsFilterMenuItem>
      {Object.values(ProjectLifecycle).map(l => (
        <ProjectsFilterMenuItem key={l} selected={l === lifecycle} onClick={() => setLifecycle(l)}>
          {l}
        </ProjectsFilterMenuItem>
      ))}
    </Menu>
  );
}

export default WorkspaceProjectsFilterMenu;
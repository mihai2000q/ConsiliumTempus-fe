import { useState } from 'react';
import { Button, Menu, MenuItem } from "@mui/material";
import ProjectStatusLabel from "./ProjectStatusLabel.tsx";
import ProjectStatusType from "../../../../utils/project/ProjectStatusType.ts";

interface ProjectStatusSelectorProps {
  value: ProjectStatusType,
  onChange: (status: ProjectStatusType) => void
}

function ProjectStatusSelector({ value, onChange }: ProjectStatusSelectorProps) {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)
  const closeMenu = () => setMenuAnchorEl(null)

  function handleMenuItemClick(status: ProjectStatusType) {
    onChange(status)
    closeMenu()
  }

  return (
    <>
      <Button
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
        sx={{ borderRadius: 2 }}>
        <ProjectStatusLabel status={value} />
      </Button>
      <Menu
        open={Boolean(menuAnchorEl)}
        anchorEl={menuAnchorEl}
        onClose={closeMenu}>
        {Object.values(ProjectStatusType).map((s) => (
          <MenuItem value={s} key={s} onClick={() => handleMenuItemClick(s)}>
            <ProjectStatusLabel status={s} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default ProjectStatusSelector;
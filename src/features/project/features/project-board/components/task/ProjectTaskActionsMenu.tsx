import { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from "react";
import { ListItemIcon, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import { ContentCopy, DeleteOutlined, Edit, Visibility } from "@mui/icons-material";

interface ProjectTaskActionsMenuProps {
  anchorEl: HTMLElement | null,
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>
}

interface ProjectStageActionsMenuItemProps {
  icon: ReactNode,
  children: ReactNode,
  color?: string | undefined,
  onClick?: MouseEventHandler<HTMLLIElement> | undefined,
  disabled?: boolean | undefined
}

const ProjectStageActionsMenuItem = ({
  onClick,
  icon,
  children,
  disabled,
  color
} : ProjectStageActionsMenuItemProps) => (
  <MenuItem disabled={disabled} onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <Typography pt={0.5} color={color}>{children}</Typography>
  </MenuItem>
)

function ProjectTaskActionsMenu({ anchorEl, setAnchorEl }: ProjectTaskActionsMenuProps) {
  const theme = useTheme()

  const handleCloseMenu = () => setAnchorEl(null)

  const handleRenameTask = () => {
    console.log('Task renamed!')
    handleCloseMenu()
  }
  const handleViewDetails = () => {
    console.log('Task details viewed!')
    handleCloseMenu()
  }
  const handleDuplicateTask = () => {
    console.log('Task duplicated!')
    handleCloseMenu()
  }
  const handleDeleteTask = () => {
    console.log('Task deleted')
    handleCloseMenu()
  }

  return (
    <Menu
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom'}}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}>
      <ProjectStageActionsMenuItem icon={<Edit />} onClick={handleRenameTask}>
        Rename Task
      </ProjectStageActionsMenuItem>
      <ProjectStageActionsMenuItem icon={<Visibility />} onClick={handleViewDetails}>
        View Details
      </ProjectStageActionsMenuItem>
      <ProjectStageActionsMenuItem icon={<ContentCopy />} onClick={handleDuplicateTask}>
        Duplicate Task
      </ProjectStageActionsMenuItem>
      <ProjectStageActionsMenuItem
        color={theme.palette.error.light}
        icon={<DeleteOutlined sx={{ color: theme.palette.error.light }} />}
        onClick={handleDeleteTask}>
        Delete Task
      </ProjectStageActionsMenuItem>
    </Menu>
  );
}

export default ProjectTaskActionsMenu;
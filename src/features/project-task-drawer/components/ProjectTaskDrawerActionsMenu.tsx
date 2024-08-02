import { MouseEventHandler, ReactNode } from "react";
import { ListItemIcon, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import { ContentCopy, DeleteOutlined } from "@mui/icons-material";
import { useDeleteProjectTaskMutation } from "../state/projectTaskDrawerApi.ts";

interface ProjectTaskActionsMenuItemProps {
  icon: ReactNode,
  children: ReactNode,
  color?: string | undefined,
  onClick?: MouseEventHandler<HTMLLIElement> | undefined,
  disabled?: boolean | undefined
}

const ProjectTaskActionsMenuItem = ({
  onClick,
  icon,
  children,
  disabled,
  color
} : ProjectTaskActionsMenuItemProps) => (
  <MenuItem disabled={disabled} onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <Typography pt={0.5} color={color}>{children}</Typography>
  </MenuItem>
)

interface ProjectTaskDrawerActionsMenuProps {
  anchorEl: HTMLElement | null,
  onClose: () => void,
  taskId: string
}

function ProjectTaskDrawerActionsMenu({ anchorEl, onClose, taskId }: ProjectTaskDrawerActionsMenuProps) {
  const theme = useTheme()

  const handleDuplicateTask = () => {
    onClose()
  }

  const [deleteProjectTask] = useDeleteProjectTaskMutation()
  const handleDeleteTask = () => {
    deleteProjectTask({ id: taskId })
    onClose()
  }

  return (
    <Menu
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom'}}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}>
      <ProjectTaskActionsMenuItem icon={<ContentCopy />} onClick={handleDuplicateTask}>
        Duplicate Task
      </ProjectTaskActionsMenuItem>
      <ProjectTaskActionsMenuItem
        color={theme.palette.error.light}
        icon={<DeleteOutlined sx={{ color: theme.palette.error.light }} />}
        onClick={handleDeleteTask}>
        Delete Task
      </ProjectTaskActionsMenuItem>
    </Menu>
  );
}

export default ProjectTaskDrawerActionsMenu;
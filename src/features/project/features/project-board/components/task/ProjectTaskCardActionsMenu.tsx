import { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from "react";
import { ListItemIcon, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import { ContentCopy, DeleteOutlined, LinkOutlined, Visibility } from "@mui/icons-material";
import { useDeleteProjectTaskMutation } from "../../state/projectBoardApi.ts";
import { useNavigate } from "react-router-dom";
import Paths from "../../../../../../utils/Paths.ts";

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

interface ProjectTaskCardActionsMenuProps {
  anchorEl: HTMLElement | null,
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>,
  taskId: string
}

function ProjectTaskCardActionsMenu({ anchorEl, setAnchorEl, taskId }: ProjectTaskCardActionsMenuProps) {
  const theme = useTheme()

  const navigate = useNavigate()

  const handleCloseMenu = () => setAnchorEl(null)

  const handleViewDetails = () => {
    handleCloseMenu()
    navigate(`${Paths.ProjectTask}/${taskId}`)
  }
  const handleCopyTaskLink = () => {
    handleCloseMenu()
    navigator.clipboard.writeText(`${window.location.host}${Paths.ProjectTask}/${taskId}`).then()
  }
  const handleDuplicateTask = () => {
    console.log('Task duplicated!')
    handleCloseMenu()
  }

  const [deleteProjectTask] = useDeleteProjectTaskMutation()
  const handleDeleteTask = () => {
    deleteProjectTask({ id: taskId }).unwrap()
    handleCloseMenu()
  }

  return (
    <Menu
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom'}}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}>
      <ProjectTaskActionsMenuItem icon={<Visibility />} onClick={handleViewDetails}>
        View Details
      </ProjectTaskActionsMenuItem>
      <ProjectTaskActionsMenuItem icon={<LinkOutlined />} onClick={handleCopyTaskLink}>
        Copy Task Link
      </ProjectTaskActionsMenuItem>
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

export default ProjectTaskCardActionsMenu;
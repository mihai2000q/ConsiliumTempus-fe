import { MouseEventHandler, ReactNode } from "react";
import { ListItemIcon, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import { CheckCircleOutlineRounded, ContentCopy, DeleteOutlined, LinkOutlined, Visibility } from "@mui/icons-material";
import { useDeleteProjectTaskMutation, useUpdateProjectTaskMutation } from "../../state/projectBoardApi.ts";
import { useNavigate } from "react-router-dom";
import Paths from "../../../../../../utils/enums/Paths.ts";
import ProjectTask from "../../types/ProjectTask.model.ts";

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
  onClose: () => void,
  task: ProjectTask
}

function ProjectTaskCardActionsMenu({ anchorEl, onClose, task }: ProjectTaskCardActionsMenuProps) {
  const theme = useTheme()

  const navigate = useNavigate()

  const [updateProjectTask] = useUpdateProjectTaskMutation()
  const [deleteProjectTask] = useDeleteProjectTaskMutation()

  const handleViewDetails = () => {
    onClose()
    navigate(`${Paths.ProjectTask}/${task.id}`)
  }
  const handleCopyTaskLink = () => {
    onClose()
    navigator.clipboard.writeText(`${window.location.host}${Paths.ProjectTask}/${task.id}`).then()
  }
  const handleDuplicateTask = () => {
    onClose()
  }
  const handleMarkCompleteTask = () => {
    updateProjectTask({
      id: task.id,
      name: task.name,
      isCompleted: true,
      assigneeId: task.assignee?.id ?? null
    })
    onClose()
  }
  const handleMarkIncompleteTask = () => {
    updateProjectTask({
      id: task.id,
      name: task.name,
      isCompleted: false,
      assigneeId: task.assignee?.id ?? null
    })
    onClose()
  }
  const handleDeleteTask = () => {
    deleteProjectTask({ id: task.id })
    onClose()
  }

  return (
    <Menu
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom'}}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}>
      <ProjectTaskActionsMenuItem icon={<Visibility />} onClick={handleViewDetails}>
        View Details
      </ProjectTaskActionsMenuItem>
      <ProjectTaskActionsMenuItem icon={<LinkOutlined />} onClick={handleCopyTaskLink}>
        Copy Task Link
      </ProjectTaskActionsMenuItem>
      <ProjectTaskActionsMenuItem icon={<ContentCopy />} onClick={handleDuplicateTask}>
        Duplicate Task
      </ProjectTaskActionsMenuItem>
      {
        task.isCompleted
          ? (
            <ProjectTaskActionsMenuItem icon={<CheckCircleOutlineRounded />} onClick={handleMarkIncompleteTask}>
              Mark Incomplete
            </ProjectTaskActionsMenuItem>
          )
          : (
            <ProjectTaskActionsMenuItem icon={<CheckCircleOutlineRounded />} onClick={handleMarkCompleteTask}>
              Mark Complete
            </ProjectTaskActionsMenuItem>
          )
      }
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
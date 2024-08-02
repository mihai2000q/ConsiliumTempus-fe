import Project from "../type/Project.model.ts";
import { ListItemIcon, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProjectLifecycle from "../../../../../utils/project/ProjectLifecycle.ts";
import Paths from "../../../../../utils/enums/Paths.ts";
import {
  Archive,
  CreateNewFolder,
  DeleteOutlined,
  Edit,
  HourglassEmpty,
  HourglassFull,
  UnarchiveOutlined
} from "@mui/icons-material";
import { MouseEventHandler, ReactNode } from "react";
import { useDeleteProjectMutation, useUpdateProjectMutation } from "../state/workspaceProjectsApi.ts";

interface ProjectActionsMenuItemProps {
  icon: ReactNode,
  children: ReactNode,
  color?: string | undefined,
  onClick?: MouseEventHandler<HTMLLIElement> | undefined,
  disabled?: boolean | undefined
}

const ProjectActionsMenuItem = ({ onClick, icon, children, disabled, color } : ProjectActionsMenuItemProps) => (
  <MenuItem disabled={disabled} onClick={onClick}>
    <ListItemIcon sx={{ '& .MuiSvgIcon': { color: color } }}>{icon}</ListItemIcon>
    <Typography pt={0.5} color={color}>{children}</Typography>
  </MenuItem>
)

interface ProjectActionsMenuProps {
  anchorEl: HTMLElement | null,
  onClose: () => void,
  project: Project
}

function WorkspaceProjectActionsMenu({ anchorEl, onClose, project }: ProjectActionsMenuProps) {
  const theme = useTheme()

  const navigate = useNavigate()

  const [updateProject] = useUpdateProjectMutation()
  const [deleteProject] = useDeleteProjectMutation()

  const handleEditProject = () => {
    onClose()
  }

  const handleAddProjectToPortfolio = () => {
    onClose()
  }

  const handleUnarchiveProject = () => {
    updateProject({
      id: project.id,
      name: project.name,
      lifecycle: ProjectLifecycle.Active
    })
    onClose()
  }
  const handleArchiveProject = () => {
    updateProject({
      id: project.id,
      name: project.name,
      lifecycle: ProjectLifecycle.Archived,
    })
    onClose()
  }

  const handleUnsetUpcomingProject = () => {
    updateProject({
      id: project.id,
      name: project.name,
      lifecycle: ProjectLifecycle.Active
    })
    onClose()
  }
  const handleSetUpcomingProject = () => {
    updateProject({
      id: project.id,
      name: project.name,
      lifecycle: ProjectLifecycle.Upcoming
    })
    onClose()
  }

  const handleDeleteProject = async () => {
    onClose()
    await deleteProject({ id: project.id })
    navigate(Paths.Projects)
  }

  return (
    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}>
      <ProjectActionsMenuItem icon={<Edit />} onClick={handleEditProject}>
        Edit Project Details
      </ProjectActionsMenuItem>

      <ProjectActionsMenuItem icon={<CreateNewFolder />} onClick={handleAddProjectToPortfolio}>
        Add To Portfolio
      </ProjectActionsMenuItem>

      {
        project.lifecycle === 'Archived'
          ?
          <ProjectActionsMenuItem icon={<UnarchiveOutlined />} onClick={handleUnarchiveProject}>
            Unarchive
          </ProjectActionsMenuItem>
          :
          <ProjectActionsMenuItem icon={<Archive />} onClick={handleArchiveProject}>
            Archive
          </ProjectActionsMenuItem>
      }
      {
        project.lifecycle === 'Upcoming'
          ?
          <ProjectActionsMenuItem icon={<HourglassEmpty />} onClick={handleUnsetUpcomingProject}>
            Unset Upcoming
          </ProjectActionsMenuItem>
          :
          <ProjectActionsMenuItem icon={<HourglassFull />} onClick={handleSetUpcomingProject}>
            Set Upcoming
          </ProjectActionsMenuItem>
      }
      <ProjectActionsMenuItem
        color={theme.palette.error.light}
        icon={<DeleteOutlined sx={{ color: theme.palette.error.light }} />}
        onClick={handleDeleteProject}>
        Delete Project
      </ProjectActionsMenuItem>
    </Menu>
  );
}

export default WorkspaceProjectActionsMenu;
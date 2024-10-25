import { Divider, ListItemIcon, Menu, MenuItem, Typography, useTheme } from '@mui/material'
import {
  Archive,
  ContentCopy,
  CreateNewFolder,
  DeleteOutlined,
  Edit,
  HourglassEmpty,
  HourglassFull,
  ManageAccounts,
  MoveDown,
  Save,
  UnarchiveOutlined
} from '@mui/icons-material'
import Paths from '../../../utils/enums/Paths.ts'
import { useNavigate } from 'react-router-dom'
import { MouseEventHandler, ReactNode } from 'react'
import Project from '../types/Project.model.ts'
import { useDeleteProjectMutation, useUpdateProjectMutation } from '../state/projectApi.ts'
import ProjectLifecycle from '../../../utils/project/ProjectLifecycle.ts'
import { useSnackbar } from 'notistack'

interface ProjectActionsMenuItemProps {
  icon: ReactNode,
  children: ReactNode,
  color?: string | undefined,
  onClick?: MouseEventHandler<HTMLLIElement> | undefined,
  disabled?: boolean | undefined
}

const ProjectActionsMenuItem = ({ onClick, icon, children, disabled, color }: ProjectActionsMenuItemProps) => (
  <MenuItem disabled={disabled} onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <Typography pt={0.5} color={color}>{children}</Typography>
  </MenuItem>
)

interface ProjectActionsMenuProps {
  anchorEl: HTMLElement | null,
  onClose: () => void,
  projectId: string,
  project: Project
}

function ProjectActionsMenu({
                              anchorEl,
                              onClose,
                              projectId,
                              project
                            }: ProjectActionsMenuProps) {
  const theme = useTheme()

  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const [updateProject] = useUpdateProjectMutation()
  const [deleteProject] = useDeleteProjectMutation()

  const handleEditProject = () => {
    onClose()
  }

  const handleDuplicateProject = () => {
    onClose()
  }
  const handleAddProjectToPortfolio = () => {
    onClose()
  }
  const handleSaveProjectTemplate = () => {
    onClose()
  }
  const handleMoveToNextSprint = () => {
    onClose()
  }

  const handleUnarchiveProject = () => {
    updateProject({
      id: projectId,
      name: project.name,
      lifecycle: ProjectLifecycle.Active
    })
    enqueueSnackbar('Project unarchived!', { variant: 'info' })
    onClose()
  }
  const handleArchiveProject = () => {
    updateProject({
      id: projectId,
      name: project.name,
      lifecycle: ProjectLifecycle.Archived
    })
    enqueueSnackbar('Project has been archived!', { variant: 'info' })
    onClose()
  }

  const handleUnsetUpcomingProject = () => {
    updateProject({
      id: projectId,
      name: project.name,
      lifecycle: ProjectLifecycle.Active
    })
    enqueueSnackbar('Project unset from \'Upcoming\'', { variant: 'info' })
    onClose()
  }
  const handleSetUpcomingProject = () => {
    updateProject({
      id: projectId,
      name: project.name,
      lifecycle: ProjectLifecycle.Upcoming
    })
    enqueueSnackbar('Project set to \'Upcoming\'', { variant: 'info' })
    onClose()
  }

  const handleDeleteProject = async () => {
    onClose()
    await deleteProject({ id: projectId })
    navigate(Paths.Projects)
    enqueueSnackbar('Project has been deleted!', { variant: 'success' })
  }

  return (
    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}>
      <ProjectActionsMenuItem icon={<Edit />} onClick={handleEditProject}>
        Edit Project Details
      </ProjectActionsMenuItem>
      <ProjectActionsMenuItem disabled icon={<ManageAccounts />}>
        Manage Allowed Members
      </ProjectActionsMenuItem>

      <Divider variant={'middle'} />
      <ProjectActionsMenuItem icon={<ContentCopy />} onClick={handleDuplicateProject}>
        Duplicate
      </ProjectActionsMenuItem>
      <ProjectActionsMenuItem icon={<CreateNewFolder />} onClick={handleAddProjectToPortfolio}>
        Add To Portfolio
      </ProjectActionsMenuItem>
      <ProjectActionsMenuItem icon={<Save />} onClick={handleSaveProjectTemplate}>
        Save as Template
      </ProjectActionsMenuItem>
      <ProjectActionsMenuItem icon={<MoveDown />} onClick={handleMoveToNextSprint}>
        Move To The Next Sprint
      </ProjectActionsMenuItem>

      <Divider variant={'middle'} />
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
  )
}

export default ProjectActionsMenu

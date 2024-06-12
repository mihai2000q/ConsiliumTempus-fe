import { Divider, ListItemIcon, Menu, MenuItem, Typography, useTheme } from "@mui/material";
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
} from "@mui/icons-material";
import Paths from "../../../utils/Paths.ts";
import { useNavigate } from "react-router-dom";
import { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from "react";
import Project from "../types/Project.model.ts";
import { useDeleteProjectMutation } from "../state/projectApi.ts";

interface ProjectActionsMenuItemProps {
  icon: ReactNode,
  children: ReactNode,
  color?: string | undefined,
  onClick?: MouseEventHandler<HTMLLIElement> | undefined,
  disabled?: boolean | undefined
}

const ProjectActionsMenuItem = ({ onClick, icon, children, disabled, color } : ProjectActionsMenuItemProps) => (
  <MenuItem disabled={disabled} onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <Typography pt={0.5} color={color}>{children}</Typography>
  </MenuItem>
)

interface ProjectActionsMenuProps {
  anchorEl: HTMLElement | null,
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>,
  projectId: string,
  project: Project
}

function ProjectActionsMenu({
  anchorEl,
  setAnchorEl,
  projectId,
  project
} : ProjectActionsMenuProps ) {
  const theme = useTheme()

  const navigate = useNavigate()

  const handleCloseMenu = () => setAnchorEl(null)

  const [deleteProject] = useDeleteProjectMutation()

  const handleEditProject = () => {
    console.log("Go to edit project")
    handleCloseMenu()
  }

  const handleDuplicateProject = () => {
    console.log("Project duplicated")
    handleCloseMenu()
  }
  const handleAddProjectToPortfolio = () => {
    console.log("Project added to portfolio")
    handleCloseMenu()
  }
  const handleSaveProjectTemplate = () => {
    console.log("Project saved as template")
    handleCloseMenu()
  }
  const handleMoveToNextSprint = () => {
    console.log("Project moved to next sprint")
    handleCloseMenu()
  }

  const handleUnarchiveProject = () => {
    console.log("Project unarchived")
    handleCloseMenu()
  }
  const handleArchiveProject = () => {
    console.log("Project archived")
    handleCloseMenu()
  }

  const handleUnsetUpcomingProject = () => {
    console.log("Project unset upcoming")
    handleCloseMenu()
  }
  const handleSetUpcomingProject = () => {
    console.log("Project set upcoming")
    handleCloseMenu()
  }

  const handleDeleteProject = async () => {
    handleCloseMenu()
    await deleteProject({ id: projectId })
    navigate(Paths.Projects)
  }

  return (
    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleCloseMenu}>
      <ProjectActionsMenuItem icon={<Edit />} onClick={handleEditProject}>
        Edit Project Details
      </ProjectActionsMenuItem>
      <ProjectActionsMenuItem disabled icon={<ManageAccounts />}>
        Manage Allowed Members
      </ProjectActionsMenuItem>

      <Divider variant={'middle'}/>
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

      <Divider variant={'middle'}/>
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

export default ProjectActionsMenu;
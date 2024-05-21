import { Divider, ListItemIcon, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import {
  Archive,
  ContentCopy,
  CreateNewFolder,
  DeleteOutlined,
  Edit,
  ManageAccounts,
  MoveDown,
  Save
} from "@mui/icons-material";
import Paths from "../../../utils/Paths.ts";
import { useNavigate } from "react-router-dom";
import { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from "react";

interface ProjectActionsMenuProps {
  anchorEl: HTMLElement | null,
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>
}

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

function ProjectActionsMenu({ anchorEl, setAnchorEl } : ProjectActionsMenuProps ) {
  const theme = useTheme()

  const navigate = useNavigate()

  const handleCloseMenu = () => setAnchorEl(null)

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

  const handleArchiveProject = () => {
    console.log("Project archived")
    handleCloseMenu()
  }
  const handleDeleteProject = () => {
    console.log("Project deleted")
    navigate(Paths.Projects)
    handleCloseMenu()
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
      <ProjectActionsMenuItem icon={<Archive />} onClick={handleArchiveProject}>
        Archive
      </ProjectActionsMenuItem>
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
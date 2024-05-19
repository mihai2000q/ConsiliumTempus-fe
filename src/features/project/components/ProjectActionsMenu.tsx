import { Divider, ListItemIcon, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import {
  Archive,
  ContentCopy,
  CreateNewFolder,
  Delete,
  Edit,
  ManageAccounts,
  MoveDown,
  Save
} from "@mui/icons-material";
import Paths from "../../../utils/Paths.ts";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

interface ProjectActionsMenuProps {
  anchorEl: HTMLElement | null,
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>
}

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
      <MenuItem onClick={handleEditProject}>
        <ListItemIcon>
          <Edit fontSize={'small'} />
        </ListItemIcon>
        <Typography pt={0.5}>Edit Project Details</Typography>
      </MenuItem>
      <MenuItem disabled>
        <ListItemIcon>
          <ManageAccounts fontSize={'small'} />
        </ListItemIcon>
        <Typography pt={0.5}>Manage Allowed Members</Typography>
      </MenuItem>

      <Divider variant={'middle'}/>
      <MenuItem onClick={handleDuplicateProject}>
        <ListItemIcon>
          <ContentCopy fontSize={'small'} />
        </ListItemIcon>
        <Typography pt={0.5}>Duplicate</Typography>
      </MenuItem>
      <MenuItem onClick={handleAddProjectToPortfolio}>
        <ListItemIcon>
          <CreateNewFolder fontSize={'small'} />
        </ListItemIcon>
        <Typography pt={0.5}>Add To Portfolio</Typography>
      </MenuItem>
      <MenuItem onClick={handleSaveProjectTemplate}>
        <ListItemIcon>
          <Save fontSize={'small'} />
        </ListItemIcon>
        <Typography pt={0.5}>Save Project as Template</Typography>
      </MenuItem>
      <MenuItem onClick={handleMoveToNextSprint}>
        <ListItemIcon>
          <MoveDown fontSize={'small'} />
        </ListItemIcon>
        <Typography pt={0.5}>Move To The Next Sprint</Typography>
      </MenuItem>

      <Divider variant={'middle'}/>
      <MenuItem onClick={handleArchiveProject}>
        <ListItemIcon>
          <Archive fontSize={'small'} />
        </ListItemIcon>
        <Typography pt={0.5}>Archive</Typography>
      </MenuItem>
      <MenuItem onClick={handleDeleteProject}>
        <ListItemIcon>
          <Delete fontSize={'small'} sx={{ color: `${theme.palette.error.light}` }} />
        </ListItemIcon>
        <Typography pt={0.5} color={theme.palette.error.light}>Delete Project</Typography>
      </MenuItem>
    </Menu>
  );
}

export default ProjectActionsMenu;
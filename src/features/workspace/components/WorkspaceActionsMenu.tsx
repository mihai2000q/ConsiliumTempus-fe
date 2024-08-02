import { ListItemIcon, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import { CreateNewFolder, DeleteOutlined, Edit, ManageAccounts } from "@mui/icons-material";
import Paths from "../../../utils/enums/Paths.ts";
import { useNavigate } from "react-router-dom";
import { MouseEventHandler, ReactNode } from "react";
import { useDeleteWorkspaceMutation } from "../state/workspaceApi.ts";
import { useSnackbar } from "notistack";

interface ProjectActionsMenuItemProps {
  icon: ReactNode,
  children: ReactNode,
  color?: string | undefined,
  onClick?: MouseEventHandler<HTMLLIElement> | undefined,
  disabled?: boolean | undefined
}

const WorkspaceActionsMenuItem = ({ onClick, icon, children, disabled, color } : ProjectActionsMenuItemProps) => (
  <MenuItem disabled={disabled} onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <Typography pt={0.5} color={color}>{children}</Typography>
  </MenuItem>
)

interface WorkspaceActionsMenuProps {
  anchorEl: HTMLElement | null,
  onClose: () => void,
  workspaceId: string
}

function WorkspaceActionsMenu({
  anchorEl,
  onClose,
  workspaceId
} : WorkspaceActionsMenuProps ) {
  const theme = useTheme()

  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const [deleteWorkspace] = useDeleteWorkspaceMutation()

  const handleEditWorkspace = () => {
    onClose()
  }
  const handleManageCollaborators = () => {
    onClose()
  }
  const handleAddWorkspaceToPortfolio = () => {
    onClose()
  }
  const handleDeleteWorkspace = async () => {
    onClose()
    await deleteWorkspace({ id: workspaceId })
    enqueueSnackbar("Workspace deleted successfully!", { variant: 'success' })
    navigate(Paths.Workspaces)
  }

  return (
    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}>
      <WorkspaceActionsMenuItem icon={<Edit />} onClick={handleEditWorkspace}>
        Edit Workspace Details
      </WorkspaceActionsMenuItem>
      <WorkspaceActionsMenuItem icon={<ManageAccounts />} onClick={handleManageCollaborators}>
        Manage Collaborators
      </WorkspaceActionsMenuItem>
      <WorkspaceActionsMenuItem icon={<CreateNewFolder />} onClick={handleAddWorkspaceToPortfolio}>
        Add To Portfolio
      </WorkspaceActionsMenuItem>
      <WorkspaceActionsMenuItem
        color={theme.palette.error.light}
        icon={<DeleteOutlined sx={{ color: theme.palette.error.light }} />}
        onClick={handleDeleteWorkspace}>
        Delete Workspace
      </WorkspaceActionsMenuItem>
    </Menu>
  );
}

export default WorkspaceActionsMenu;
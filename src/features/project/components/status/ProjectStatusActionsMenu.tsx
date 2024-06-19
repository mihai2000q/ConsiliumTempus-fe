import { MouseEventHandler, ReactNode, useState } from 'react';
import { ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import UpdateProjectStatusDialog from "./UpdateProjectStatusDialog.tsx";
import ProjectStatus from "../../types/ProjectStatus.model.ts";
import { useRemoveStatusFromProjectMutation } from "../../state/projectApi.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store.ts";

interface ProjectStatusActionsMenuItemProps {
  children: ReactNode,
  icon?: ReactNode | undefined,
  color?: string | undefined,
  onClick?: MouseEventHandler<HTMLLIElement> | undefined,
  disabled?: boolean | undefined
}

const ProjectStatusActionsMenuItem = ({
  onClick,
  icon,
  children,
  disabled,
  color
} : ProjectStatusActionsMenuItemProps) => (
  <MenuItem disabled={disabled} onClick={onClick}>
    {icon && <ListItemIcon>{icon}</ListItemIcon>}
    <Typography pt={icon ? 0.5 : 0} color={color}>{children}</Typography>
  </MenuItem>
)

interface ProjectStatusActionsMenuProps {
  anchorEl: HTMLElement | null,
  onClose: () => void,
  projectStatus: ProjectStatus
}

function ProjectStatusActionsMenu({
  anchorEl,
  onClose,
  projectStatus
}: ProjectStatusActionsMenuProps) {
  const projectId = useSelector((state: RootState) => state.project.projectId)

  const [isUpdateProjectStatusDialogOpen, setIsUpdateProjectStatusDialogOpen] = useState(false)
  const handleCloseUpdateProjectStatusDialog = () => setIsUpdateProjectStatusDialogOpen(false)

  const [removeStatusFromProject] = useRemoveStatusFromProjectMutation()

  function handleUpdate() {
    onClose()
    setIsUpdateProjectStatusDialogOpen(true)
  }
  async function handleDelete() {
    onClose()
    removeStatusFromProject({
      id: projectId,
      statusId: projectStatus.id
    })
  }

  return (
    <>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onClose}>
        <ProjectStatusActionsMenuItem icon={<EditOutlined />} onClick={handleUpdate}>
          Update Status
        </ProjectStatusActionsMenuItem>
        <ProjectStatusActionsMenuItem
          color={'error.light'}
          icon={<DeleteOutlined sx={{ color: 'error.light' }} />}
          onClick={handleDelete}>
          Delete Status
        </ProjectStatusActionsMenuItem>
      </Menu>
      <UpdateProjectStatusDialog
        open={isUpdateProjectStatusDialogOpen}
        onClose={handleCloseUpdateProjectStatusDialog}
        initialProjectStatus={projectStatus} />
    </>
  );
}

export default ProjectStatusActionsMenu;